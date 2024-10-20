import { Schema, model } from "mongoose"


const storySchema = new Schema({
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
    image: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24

    }
})

const Story = model("Story", storySchema)

export default Story