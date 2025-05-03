import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const prisma=new PrismaClient();

export const registerUser= async (req,res)=>{
    
    const {name,email,password,phone}=req.body;

    if(!name || !email || !password  || !phone){
        res.status(400).json({
            success:false,
            message:"All fields are required"});
    }
    
    try {
        const existingUser= await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(existingUser){
            res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const hashedPassword= await bcrypt.hash(password,10)
        const verificationToken= crypto.randomBytes(32).toString("hex");

        const user= await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                verificationToken,
                phone:phone
            }
      })

      


        

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Registration failed",
            error: error.message
        })
        
    }
}

export const login =async (req,res)=>{
    
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    try {
        const user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const isMatch=bcrypt.compare(password,user.password); 
         
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const token=jwt.sign({id:user.id,role:user.role}, process.env.JWT_SECRET,{
            expiresIn:"1d"
        })
    
    const cookieOptions={
        httpOnly:true
    }

    res.cookie("token",token,cookieOptions);

    return res.status(200).json({
        success:true,
        message:"Login successful",
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone
        },
        token:token
    })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Login failed",
            error:error.message
        })
    }
}