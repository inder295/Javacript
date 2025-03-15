import User from "../models/User.model.js"
import crypto from 'crypto'
import nodemailer from  'nodemailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser=async (req,res)=>{
  //get data
  //validate 
  //check if user already exists 

  //create user in database
  //create a verification token
  //save token in database
  //send token as email to user
  //send success message status to user
  console.log(req.body);
  
  const {name,email,password}=req.body;

  if(!name || !email || !password){
    return res.status(400).json({
        message : "All fields are required"
    })
  }

  try {

   const existingUser= await User.findOne({email});
   if(existingUser){
    return res.status(400).json({
      message :"User already exists"
    })
   }

   const user=await User.create({
    name,
    email,
    password
   })

   if(!user){
     return res.status(400).json({
      message :"User registration failed"
     })
   }
    //random string geneerator 
   const token = crypto.randomBytes(32).toString('hex');
   console.log(token);
   user.verificationToken=token;
   await user.save();
   
   //send email

   const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mailOptions={
    from: process.env.MAILTRAP_SENDER_EMAIL, 
    to: user.email,
    subject: "Verifing your email", 
    text: `Click on this link to register your email :
     ${process.env.BASE_URL}/api/v1/users/${token}`
    
   
  }

  await transporter.sendMail(mailOptions);
  res.status(201).json({
    message : "Uswer registered successfully",
    success: true
  })
    
  } catch (error) {
    res.status(400).json({
      message :"User registration failed",
      error,
      success:false
    })
  }  
}

const verifyUser=async (req,res)=>{
  //get token from url
  //validate 
  //find user based on token 
  //if not 
  //set isverified to true
  //remove verification tokenm
  //save
  //return response 

  const {token}=req.params;
  console.log(token);

  if(!token){
    return res.status(400).json({
      message :"Invalid token"
    })
  }
  
  const user= await User.findOne({verificationToken:token});
  if(!user){
    return res.status(400).json({
      message :"Invalid token"
    })
  }

  user.isVerified=true;
  user.verificationToken=undefined;
  await user.save();
  

}

const login=async (req,res) =>{
   
  const {email,password}=req.body;

  if(!email || !password){
    return res.status(400).json({
      message :"All fiels are required"
    })
  }

  try {
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({
        message :"User not found"
      })
    }
     
    //returning boolean value
    const isMatch=await bcrypt.compare(password,user.password);
    console.log(isMatch);
    
    if(!isMatch){
      return res.status(400).json({
        message :"Invalid Password"
      })
    }
    // data,secret key,expires in
   const token= jwt.sign({id:user._id,role:user.role},'shhhh',{expiresIn:'24h'});
 
   //key value -> token=token
   const cookieOptions={
      httpOnly:true,
      secure:true,
      maxAge: 24*60*60*1000,
   }
   res.cookie('token',token,cookieOptions);

   res.status(200).json({
     message:"User login successfull",
     success:true,
     token,
     user:{
       id: user._id,
       name:user.name,
       role:user.role
     }
   })



  } catch (error) {
    
  }
}

export {registerUser,verifyUser,login};