import {Comment, Confess} from "../models/confess.model.js";
// import {getFromRedis, setInRedis, updateInRedis} from "../utils/redisHelper.js";
import {getFromRedis, setInRedis} from "../utils/redisHelper.js";

import * as ConfessType from "../definations/confessType.js";
import {RedisConfessionKeys} from "../utils/redisHelper.js";
import {redisClient} from "../index.js";

const confessController = {
	getAllConfessions: async (req, res) => {
		const cacheKey = RedisConfessionKeys.allConfessions;

		try {
			// if have cache, give cache
			const cacheData = await getFromRedis(cacheKey);
			if (cacheData) {
				return res.status(200).json({data: cacheData});
			}
			// no cache,
			const data = await Confess.find().sort({updatedAt: -1});
			if (data) {
				await setInRedis(cacheKey, data, 60); // if we no data, get data and kashee it.
				return res.status(200).json({data});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: error.message});
		}
	},
	getUserConfessions: async (req, res) => {
		const {userId} = req;
		const cacheKey = RedisConfessionKeys.aUserConfessions(userId);

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
			const {description, isanonymous} = req.body;
			const username = isanonymous ? "Anonymous" : fullName;
			const newConfess = new Confess({
				description,
				isanonymous,
				userId,
				fullName: username,
			});
			const data = await newConfess.save();

			res.status(200).json({message: "Confession saved successfully", data});

			// purge in redis
			redisClient.del(RedisConfessionKeys.allConfessions);
			redisClient.del(RedisConfessionKeys.aUserConfessions(userId));
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},

	getComments: async (req, res) => {
		const {confessionId} = req.params;
		const cacheKey = RedisConfessionKeys.allCommentsInConfession(confessionId);

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
		const cacheKey = RedisConfessionKeys.allCommentsInConfession(confessionId);

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
			redisClient.del(
				RedisConfessionKeys.allCommentsInConfession(confessionId)
			);
		} catch (error) {
			console.log(error)
			return res.status(500).json({message: "Internal Server Error Occured!"});
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

	postConfessionReaction: async (req, res) => {
		const {userId} = req;
		const {confessionId} = req.params;

		/** @type {ConfessType.ReactionBody} */
		const {action} = req.body;

		let updatedReaction;
		try {
			if (action == "LIKE") {
				await Confess.updateOne(
					{_id: confessionId},
					{$addToSet: {like: userId}, $pull: {dislike: userId}}
				);
			} else if (action === "DISLIKE") {
				await Confess.updateOne(
					{_id: confessionId},
					{$addToSet: {dislike: userId}, $pull: {like: userId}}
				);
			} else if (action === "NONE") {
				await Confess.updateOne(
					{_id: confessionId},
					{$pull: {like: userId, dislike: userId}}
				);
			} else {
				return res.status(400).json({message: `Invalid action: ${action}`});
			}

			return res.status(200).json({message: "Reaction Updated Successfully"});
		} catch (error) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},
};

export default confessController;
