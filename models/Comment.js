import { Schema, model } from "mongoose"

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    replies: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true,
            trim: true
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = model("Comment", commentSchema)

export default Comment