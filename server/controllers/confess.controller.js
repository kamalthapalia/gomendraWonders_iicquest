import {Comment, Confess, Reaction} from "../models/confess.model.js";
import {getFromRedis, setInRedis} from "../utils/redisHelper.js";

import * as ConfessType from "../definations/confessType.js";
import {RedisKeys} from "../utils/redisHelper.js";
import {redisClient} from "../index.js";

const confessController = {
	getAllConfessions: async (req, res) => {
		try {
			const data = await Confess.find().sort({createdAt: -1});
			if (data) {
				return res.status(200).json({data});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: error.message});
		}
	},
	getUserConfessions: async (req, res) => {
		const {userId} = req;
		const cacheKey = RedisKeys.aUserConfessions(userId);

		try {
			// hell ya! we got cached data
			const cacheData = await getFromRedis(cacheKey);
			if (cacheData) {
				return res.status(200).json({data: cacheData});
			}

			// We didn't ? well, we gonna make it
			const data = await Confess.find({userId}).sort({updatedAt: -1});
			if (data) {
				await setInRedis(cacheKey, data, 6000);
				return res.status(200).json({data});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: error.message});
		}
	},
	// not in use
	getSingleConfession: async (req, res) => {
		try {
			const data = await Confess.findById(req.params.id);
			if (data) return res.status(200).json({data});
		} catch (error) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},
	postConfession: async (req, res) => {
		const {userId, fullName} = req;

		try {
			const reactionObj = new Reaction({});
			const newReactionObj = await reactionObj.save();

			const {description, isanonymous} = req.body;
			const username = isanonymous ? "Anonymous" : fullName;
			const newConfess = new Confess({
				description,
				isanonymous,
				userId,
				fullName: username,
				reactionId: newReactionObj._id,
			});
			const data = await newConfess.save();

			res.status(200).json({message: "Confession saved successfully", data});

			// purge in redis
			redisClient.del(RedisKeys.aUserConfessions(userId));
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},

	updateConfessions: async (req, res) => {
		const {fullName, userId} = req;
		try {
			const {id} = req.params;
			const {description, isanonymous} = req.body;
			const username = isanonymous ? "Anonymous" : fullName;

			// ensures that the changee is the user him/herself. hah! mero angreji
			const updatedConfession = await Confess.findOneAndUpdate(
				{_id: id, userId},
				{description, isanonymous, fullName: username},
				{new: true} // Return the updated document
			);

			if (!updatedConfession) {
				return res
					.status(400)
					.json({message: "Naughty, Naughty. Tryin' deleting others property"});
			}
			res.status(200).json({message: "Confession Updated Successfully"});
		} catch (error) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},
	deleteConfessions: async (req, res) => {
		const {userId} = req;
		try {
			const {id} = req.params;
			const deletedConfession = await Confess.findOneAndDelete(
				{_id: id, userId},
				{new: true}
			);

			if (!deletedConfession) {
				return res.status(400).json({
					message: "You godDamn person. Why tryin' deletin' others confession?",
				});
			}

			res.status(200).json({message: "Confession Deleted Successfully"});
		} catch (error) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},

	getComments: async (req, res) => {
		const {confessionId} = req.params;
		const cacheKey = RedisKeys.allCommentsInConfession(confessionId);

		try {
			const cacheData = await getFromRedis(cacheKey);
			if (cacheData) return res.status(200).json({data: cacheData});

			const confession = await Confess.findById(confessionId);
			if (!confession) {
				return res.status(400).json({message: "No such confession exist!"});
			}

			const confessionCommentIds = confession.comments || [];

			const allComments = await Comment.find({
				_id: {$in: confessionCommentIds},
			}).sort({updatedAt: -1});

			// response
			await setInRedis(cacheKey, allComments, 10800); // 3hr
			res.status(200).json({data: allComments});
		} catch (err) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},

	postComment: async (req, res) => {
		const {userId, fullName} = req;
		const {confessionId} = req.params;

		const {userComment} = req.body;
		const cacheKey = RedisKeys.allCommentsInConfession(confessionId);

		try {
			const confessionCheck = await Confess.findById(confessionId);
			if (!confessionCheck) {
				return res.status(400).json({message: "No such confession exist!"});
			}

			const newComment = await Comment({
				commenterId: userId,
				username: fullName,
				userComment,
			});

			const newSavedComment = await newComment.save();

			await Confess.updateOne(
				{_id: confessionId},
				{$push: {comments: newSavedComment._id}}
			);

			res
				.status(200)
				.json({message: "Comment sent successfully", data: newSavedComment});

			// updateInRedis(cacheKey, newSavedComment, 1200);
			redisClient.del(cacheKey);
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},

	getConfessionReaction: async (req, res) => {
		const {reactionId} = req.params;
		const cacheKey = RedisKeys.allReactionsInConfession(reactionId);

		try {
			const cacheData = await getFromRedis(cacheKey);
			if (cacheData) {
				return res.status(200).json({data: cacheData});
			}

			// Get from db
			const data = await Reaction.findOne({_id: reactionId});
			if (!data) return res.status(200).json({message: "No Reaction found"});

			res.status(200).json({data});
			// update to cache
			setInRedis(cacheKey, data);
		} catch (error) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},
	postConfessionReaction: async (req, res) => {
		const {userId} = req;
		const {reactionId} = req.params;

		const cacheKey = RedisKeys.allReactionsInConfession(reactionId);

		/** @type {ConfessType.ReactionBody} */
		const {action} = req.body;

		try {
			if (action == "LIKE") {
				await Reaction.updateOne(
					{_id: reactionId},
					{$addToSet: {like: userId}, $pull: {dislike: userId}}
				);
			} else if (action === "DISLIKE") {
				await Reaction.updateOne(
					{_id: reactionId},
					{$addToSet: {dislike: userId}, $pull: {like: userId}}
				);
			} else {
				await Reaction.updateOne(
					{_id: reactionId},
					{$pull: {like: userId, dislike: userId}}
				);
			}

			res.status(200).json({message: "Reaction Updated Successfully"});
			redisClient.del(cacheKey);
		} catch (error) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},
};

export default confessController;
