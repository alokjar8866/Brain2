import type { NextFunction, RequestHandler } from "express"
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UserModel } from "../models/user.model.js";
import { isTokenBlacklisted } from "../controllers/auth.controller.js";

/** export const userAuthMiddle: RequestHandler = async (req, res, next:NextFunction) => {
    //const token = req.cookies.token;
    const authHeader = req.headers["authorization"];
    //const token = req.headers["authorization"];
    if (!authHeader || typeof authHeader !== "string") {
        return res.status(403).json({ message: "Invalid Authorization Header" });
    }
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            msg: "Please Create Account & Login First"
        })
    }

    if (isTokenBlacklisted(token)) {
        console.log("Token Blacklisted");
        res.status(401).json({ msg: "Token has been invalidated, please login again" });
        return;
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

    
} **/


export const userAuthMiddle: RequestHandler = async (req, res, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || typeof authHeader !== "string") {
        return res.status(401).json({ message: "Invalid Authorization header" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ message: "Use format: Bearer <token>" });
    }

    if (isTokenBlacklisted(token)) {
        return res.status(401).json({ message: "Token invalidated, please login again" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET is not configured");

    try {
        const decoded = jwt.verify(token, jwtSecret);

        if (typeof decoded === "string" || !("id" in decoded)) {
            return res.status(403).json({ message: "Invalid token payload" });
        }

        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};