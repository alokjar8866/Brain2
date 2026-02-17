import type { RequestHandler } from "express"
import { ContentModel } from "../models/content.model.js"
import { LinkModel } from "../models/link.model.js";
import { randomStr } from "../utils/randomStr.js"
import { UserModel } from "../models/user.model.js";

//add the type of link which is used in schema.....DIL
export const createContent: RequestHandler = async (req, res) => {

    try {
        const { title, link } = req.body;
        /** const authorId = (req as any).user._id;  //_id **/

        const newContent = await ContentModel.create({
            title,
            link,
            type: req.body.type,
            userId: req.userId,
            tags: []
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


export const getContent: RequestHandler = async (req, res) => {

    try {
        const userId = req.userId;
        if (!userId) {
            res.status(403).json({ message: "User not authenticated" });
            return;
        }
        const content = await ContentModel.find({
            userId: userId
        }).populate("userId", "username")

        res.json({
            content
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error"
        })
    }

}


export const deleteContent: RequestHandler = async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId as string
    })

    res.json({
        "msg": "Content Deleted"
    })
}

export const shareContent: RequestHandler = async (req, res) => {

    try {
        const { share } = req.body;
        if (share) {
            const existingLink = await LinkModel.findOne({ userId: req.userId });
            if (existingLink) {
                res.json({ hash: existingLink.hash });
                return;
            }

            const hash = randomStr(10);
            await LinkModel.create({
                userId: req.userId,
                hash
            });

            res.json({ hash });
        } else {
            await LinkModel.deleteOne({ userId: req.userId });
            res.json({
                message: "Removed Link"
            });
        }

    } catch (err) {
        console.log("Error in the share api");
        res.json({
            message: "error in share api dev phase"
        })
    }
}

export const shareLink: RequestHandler = async (req, res) => {
    const hash = req.params.shareLink;


    if (!hash) {
        throw new Error("User not authenticated");
    }


    //Find the link using provided hash.
    const link = await LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({
            message: "Invalid Shared Link"       // sending error if share link is not valid
        });
        return;
    }

    //Fetch content and user details for the sharable link
    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });

    if (!user) {
        res.status(404).json({ message: "User Not Found" });
        return;
    }

    res.json({
        username: user.username,
        content
    }); // response with user content details
}