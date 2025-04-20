import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const db=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log(`mongodb is connected`);
        
    }) 
    .catch((err)=>{
        console.log(`Error in connected mongodb `);
        
    }) 
}
 
export default db;