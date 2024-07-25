import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    desc: String,
    file: String,
    email: String
})

const PostModel = mongoose.model('posts', PostSchema)

 export default PostModel;