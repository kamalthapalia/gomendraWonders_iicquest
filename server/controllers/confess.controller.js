import {Comment, Confess} from "../models/confess.model.js";

const confessController = {
	getAllConfessions: async (req, res) => {
		try {
			const data = await Confess.find().sort({updatedAt: -1});
			if (data) return res.status(200).json({data});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: error.message});
		}
	},
	getUserConfessions: async (req, res) => {
		const {userId} = req;
		try {
			const data = await Confess.find({userId}).sort({updatedAt: -1});
			if (data) return res.status(200).json({data});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: error.message});
		}
	},
	getSingleConfession: async (req, res) => {
		try {
			const data = await Confess.findById(req.params.id);
			if (data) return res.status(200).json({data});
			console.log(data);
		} catch (error) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},
	postConfession: async (req, res) => {
		// const userId = req.userId;
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
			await newConfess.save();
			res.status(200).json({message: "Confession saved successfully"});
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},

	postComment: async (req, res) => {
		const {userId, fullName} = req;
		const {confessionId} = req.params;

		const {userComment} = req.body;

		try {
			const confessionCheck = await Confess.findById(confessionId);
			if (!confessionCheck) {
				return res.status(400).json({message: "No such confession exist!"})
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

			return res.status(200).json({message: "Comment sent successfully", data: newSavedComment});

		} catch (error) {
			return res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},

	getComments: async(req, res) => {
		const {confessionId} = req.params;

		try {
			const confession = await Confess.findById(confessionId);
			if (!confession) {
				return res.status(400).json({message: "No such confession exist!"})
			}

			const confessionCommentIds = confession.comments || [];

			const allComments = await Comment.find({
				_id: {$in: confessionCommentIds}
			}).sort({updatedAt: -1});

			return res.status(200).json({data: allComments});
		}
		catch(err){
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},

	updateConfessions: async (req, res) => {
		const {fullName, userId} = req;
		try {
			const {id} = req.params;
			const {description, isanonymous} = req.body;
			const username = isanonymous ? "Anonymous" : fullName;

			// await Confess.findByIdAndUpdate(
			//     id,
			//     { description, isanonymous, fullName: username },
			// )
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
				return res
					.status(400)
					.json({
						message:
							"You godDamn person. Why tryin' deletin' others confession?",
					});
			}

			res.status(200).json({message: "Confession Deleted Successfully"});
		} catch (error) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},
};

export default confessController;
