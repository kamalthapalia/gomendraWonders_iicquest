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


const confessReactionSchema = new Schema({
    like: [{
        type: Types.ObjectId,
        ref: "User"
    }],

    dislike: [{
        type: Types.ObjectId,
        ref: "User"
    }],
})


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

    reactionId: {
        type: Types.ObjectId,
        ref: "Reaction"
    },
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
const Reaction = models.Reaction || model("Reaction", confessReactionSchema);

export { Comment, Confess, Reaction};