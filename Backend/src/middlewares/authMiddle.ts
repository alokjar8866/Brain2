import type { NextFunction, RequestHandler } from "express"
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UserModel } from "../models/user.model.js";

export const userAuthMiddle: RequestHandler = async (req, res, next:NextFunction) => {
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
        
        if(decoded){
            if(typeof decoded === "string"){
                res.status(403).json({
                    message:"You are not logged in"
                })
                return;
            }
            req.userId = (decoded as JwtPayload).id;
            next();
        }
    }
    catch(err){
        return res.status(401).json({
            msg:"You are not logged in"
        })
    }

    
}