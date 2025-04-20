import User from "../models/user.model.js";
import crypto from "crypto";

export const register =async (req,res)=>{

    console.log(req.body);
    
    
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message:"All credentials are required"
        })
    }

    try {
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exist"
            })
        }

        const user=new User.create({
            name,
            email,
            password
        })

        if(!user){
            return res.status(400).json({
                message:"User registration failed"
            })
        }
  
        const token=crypto.randomBytes(32).toString('hex');
        console.log(token);
        
        user.verificationToken=token;
        await user.save();

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
        
    }
} 

