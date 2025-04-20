import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from "./utils/db.js"
import userRoutes from './router/user.router.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.BASE_URL,
    methods:["GET","POST","PUT",'DELETE'],
    allowHeaders:["Content-Type","Authorization"] //through allow headers he wil send token to backend
}))

app.use(cookieParser());


const port=process.env.PORT || 4000;

app.get('/',(req,res)=>{
   res.send("hello world")
    
})

app.use('/api/v1/users',userRoutes);

db();
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})