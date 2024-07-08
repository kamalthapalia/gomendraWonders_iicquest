import mongoose, { Types } from "mongoose";
const {Schema, models, model} = mongoose

const commentSchema = new Schema({
    commenterId: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },
    username: {
        type: String,
        require: true
    },

    userComment: {
        type: String,
        require: true,
        maxlength: 1000
    }
}, {timestamps: true})

const confessSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
    },
    fullName: {
        type: String,
        require: true
    },
	description: {
		type: String,
        require: true,
        maxlength: 3500
	},

    isanonymous: {
        type: Boolean,
        require: true,
        default: false
    }, 

    like: [{
        type: Types.ObjectId,
        ref: "User"
    }],

    dislike: [{
        type: Types.ObjectId,
        ref: "User"
    }],

    comments: [
        {
            type: Types.ObjectId,
            ref: "Comment"
        }
    ]
}, {timestamps: true}
);

const Comment = models.Comment || model("Comment", commentSchema);
const Confess = models.Confess || model("Confess", confessSchema);

export { Comment, Confess};