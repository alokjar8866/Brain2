import 'dotenv/config';
import express from 'express';
import { loginUser, logoutUser, registerUser } from './controllers/auth.controller.js';
import cookieParser from 'cookie-parser';
import connectDB from './dbConnect/db.js';
import { userAuthMiddle } from './middlewares/authMiddle.js';
import { createContent, deleteContent, getContent, shareContent, shareLink, updateContent } from './controllers/content.controller.js';
import cors from "cors";
import { validate } from './middlewares/validate.js';
import { loginSchema, registerSchema } from './schemas/auth.schema.js';
const app:express.Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

connectDB();

app.get('/',function (req,res){
    res.json({
        "msg":"hello server started"
    })
})
app.post('/api/v1/signup',validate(registerSchema),registerUser);
app.post('/api/v1/signin',validate(loginSchema),loginUser);
app.post('/api/v1/logout',logoutUser);

app.post('/api/v1/content', userAuthMiddle, createContent);
app.post('/api/v1/getContent', userAuthMiddle, getContent);
app.delete('/api/v1/deletecontent', userAuthMiddle, deleteContent);
app.post('/api/v1/brain/share', userAuthMiddle, shareContent);
app.post('/api/v1/brain/:shareLink', userAuthMiddle, shareLink);

app.put('/api/v1/updateContent/:id',userAuthMiddle, updateContent);



const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});