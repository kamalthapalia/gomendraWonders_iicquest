import mongoose from "mongoose";
const { Schema, models, model, Types } = mongoose

const blogSchema = new Schema({
	userId: {
		type: Types.ObjectId,
		require: true,
		ref: "User"
	},
	title: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},

	// Picture will be in future
	// pictureUrl: {
	// 	type: {
	// 		path: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		name: {
	// 			type: String,
	// 			required: true	
	// 		}
	// 	},
	// 	require: true,
	// },
}, {timestamps: true});

const Blog = models.Blog || model("Blog", blogSchema);
export default Blog;