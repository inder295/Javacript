import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB= async ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log(`mongodb connnected`)
    )
    .catch((err)=>{
        console.log(`mongodb not connected`,err)
        process.exit(1)
    })
}

export default connectDB; 