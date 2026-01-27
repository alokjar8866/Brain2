import type { RequestHandler } from "express"
import { ContentModel } from "../models/content.model.js"

export const createContent: RequestHandler = async (req, res) => {

    try {
        const { title, link, tags } = req.body;
        const authorId = (req as any).user._id;

        const newContent = await ContentModel.create({
            title,
            link,
            //@ts-ignore
            userId: authorId,
            tags: tags || []
        })

        res.status(201).json({
            message: "Content added successfully",
            content: newContent
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to add content",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
}