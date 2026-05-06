import type { NextFunction, RequestHandler } from "express"
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from "../controllers/auth.controller.js";

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