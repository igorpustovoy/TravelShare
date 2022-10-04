const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
            minLength: 3,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }
)

const Post = model("Post", postSchema);

module.exports = Post;