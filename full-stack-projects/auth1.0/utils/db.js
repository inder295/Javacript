import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const db=()=>{

    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log(`Database connected successfully`);
        
    })
    .catch((err)=>{
        console.log(`Database connection failed`,err);
    })
}

export default db;