import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import userRoute from "./routes/auth.routes.js"

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

dotenv.config();

const port= process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("GHello World")
})

app.use("api/v1/user",userRoute);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})



