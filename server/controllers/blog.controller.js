import {redisClient} from "../index.js";
import Blogs from "../models/blog.model.js";
import {getFromRedis, RedisKeys, setInRedis} from "../utils/redisHelper.js";

const blogController = {
	// get all blogs
	getAllBlogs: async (req, res) => {
		try {
			const data = await Blogs.find().sort({updatedAt: -1});
			return res.status(200).json({data});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: error.message});
		}
	},

	getUserBlogs: async (req, res) => {
		const {userId} = req;
		const cacheKey = RedisKeys.aProBlogs(userId);
		try {
			const cacheData = await getFromRedis(cacheKey);
			if (cacheData) {
				return res.status(200).json({data: cacheData});
			}

			const data = await Blogs.find({userId}).sort({updatedAt: -1});
			if (data) {
				await setInRedis(cacheKey, data, 86400 * 7); // 7day
				return res.status(200).json({data});
			}
			res.status(200).json({message: "No Blogs found", data: []});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: error.message});
		}
	},

	getSingleBlog: async (req, res) => {
		try {
			const blog = await Blogs.findById(req.params.id);
			if (!blog) return res.status(400).json({message: "Blog not found"});
			res.status(200).json({data: blog});
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},
	postBlog: async (req, res) => {
		const userId = req.userId;
		const cacheKey = RedisKeys.aProBlogs(userId);

		try {
			const {title, description} = req.body;
			const newBlog = new Blogs({userId, title, description});

			await newBlog.save();
			res.status(200).json({message: "Blog Created Successfully"});

			// purge from redis
			redisClient.del(cacheKey);
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},
	deleteBlog: async (req, res) => {
		const {userId} = req;
		const cacheKey = RedisKeys.aProBlogs(userId);

		try {
			const {id} = req.params;
			const blog = await Blogs.findByIdAndDelete(id);
			if (!blog) return res.status(400).json({error: "Blog not found"});
			res.json({message: "Blog deleted successfully"});

			redisClient.del(cacheKey);
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},
	updateBlog: async (req, res) => {
		const {userId} = req;
		const cacheKey = RedisKeys.aProBlogs(userId);
		try {
			const {id} = req.params;
			const {title, description} = req.body;
			const blog = await Blogs.findByIdAndUpdate(
				id,
				{title, description},
				{new: true}
			);
			if (!blog) return res.status(404).json({error: "Blog not found"});
			res.status(200).json({message: "Blog Updated Successfully"});

			redisClient.del(cacheKey);
		} catch (error) {
			res.status(500).json({message: "Server error occured"});
		}
	},
};

export default blogController;
