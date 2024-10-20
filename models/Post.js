import { Schema, model } from "mongoose"

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, //connected with User schema
        ref: "User",
        required: true
    },
    caption: {
        type: String,
        trim: true
    },
    image: [{
        type: String,
        required: false
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, { timestamps: true })

const Post = model("Post", postSchema)

export default Post