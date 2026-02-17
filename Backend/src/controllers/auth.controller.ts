import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWTPass = process.env.JWT_SECRET!;

export const registerUser:RequestHandler= async(req,res)=>{
    const {fullName, username, password} = req.body;

    const isAlreadyUser = await UserModel.findOne({
        username
    })

    if(isAlreadyUser){
        return res.status(400).json({
            msg:"User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await UserModel.create({
        fullName,
        username,
        password:hashedPassword
    })

    const token = jwt.sign({
        id:user._id
    },JWTPass)


    res.cookie("token",token);

    res.status(201).json({
        msg:"User resgistered successfully",
        user:{
            _id: user._id,
            username:user.username,
            fullName:user.fullName
        }
    })

    console.log(user,token)

}

export const logoutUser:RequestHandler = async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({
        msg:"User logged out successfully"
    });
}


export const loginUser:RequestHandler = async(req,res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({
        username
    })

    if(!user){
       return res.status(400).json({
            msg:"Invalid email and password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password!)//! it tells the ts the everthing is okay

    if(!isPasswordValid){
         return res.status(400).json({
            msg:"Invalid email and password"
        })
    }

    const token = jwt.sign({
            id:user._id,
        },JWTPass);
    
        //res.cookie("token",token);
    
        res.status(200).json({
            msg:"User Logged in Successfully",
            token:token,
            user:{
                _id:user._id,
                username:user.username,
                fullName:user.fullName
            }
        })
}
