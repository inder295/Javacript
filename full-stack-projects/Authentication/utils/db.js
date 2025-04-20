import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

//export function which will help to connect my db

const db=()=>{

    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("mongodb connnected successfuly");
        
    })

    .catch((error)=>{
        console.log(`mongodb connection failed`,error);
        
    })
}

export default db;