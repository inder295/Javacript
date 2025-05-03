import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";
import cookieParser from "cookie-parser";

const app=express();

dotenv.config();
const port=process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin:process.env.BASE_URL,
    methods:["GET","POST","PUT",'DELETE'],
    allowHeaders:["Content-Type","Authorization"] //through allow headers he wil send token to backend
}))
app.use(express.urlencoded({extented:true}));
app.use(cookieParser());


app.get("/",(req,res)=>{

    console.log(req);
    console.log(res);
    res.send("hello world")
    
})

app.use("/api/v1/user",userRoutes);
db();

app.listen(port,()=>{
    console.log(`server  is running on port ${port }`);
    
})





