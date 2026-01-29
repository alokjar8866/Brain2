import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    title : String,
    link : String,
    tags: [{type: mongoose.Types.ObjectId, ref:'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref:'User',
        required:true }
}, 
{
    timestamps:true
})

export const ContentModel = mongoose.model("Content",ContentSchema);