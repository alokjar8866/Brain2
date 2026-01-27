import type { RequestHandler } from "express"
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model.js";

export const userAuthMiddle: RequestHandler = async (req, res, next) => {
    //const token = req.cookies.token;
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            msg: "Please Create Account & Login First"
        })
    }

    try {
        const JWTPass = process.env.JWT_SECRET;
        const decoded = jwt.verify(token as string,JWTPass as string);
        //@ts-ignore
        const user = await UserModel.findById(decoded.id) //as { id:string};
        //@ts-ignore
        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({
            msg:"You are not logged in"
        })
    }

    
}