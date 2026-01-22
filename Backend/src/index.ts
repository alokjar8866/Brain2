
import express from 'express';
const app = express();

app.get('/login',(req,res)=>{
    console.log("Hello Boi");
});

app.listen(3000);