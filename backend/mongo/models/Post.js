const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
            minLength: 1,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    }
)

const Post = model("Post", postSchema);

module.exports = Post;