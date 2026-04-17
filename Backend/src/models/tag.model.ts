import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, lowercase: true, trim: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true }
});

export const TagModel = mongoose.model("Tag", TagSchema);