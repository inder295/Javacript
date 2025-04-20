import User from "../models/user.model.js" 
import crypto from "crypto"
import sendVerificationEmail from "../utils/sendMail.utils.js";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config();


export const register= async (req,res)=>{
   
    const {name,email,password}=req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({
            message:"Please fill all fields"
        })
    }

    if(password.length<6){
        return res.status(400).json({
            message: "password is too short."
        })
    }
    

    try {
        
        const existingUser=await User.findOne({
            email
        })

    
        if(existingUser){
          return res.status(400).json({
            success:false,
            mesaage:"User allready exists"
          })
        }

       
        
        
        //user verification token
        const token= crypto.randomBytes(32).toString('hex');
        const token_expiry=Date.now() + 10*60*60*1000;
       

        

        const user=await User.create({
            name,
            email,
            password,
            verification_token:token,
            verification_token_expires:token_expiry
        })

        if(!user){
            return res.status(400).json({
                success:false,
                message: "User not created."
            })
        }

        //I have to send verification token to user...
        //sendmail 
        
        await sendVerificationEmail(user.email,token);
        console.log("email sent successfully");
        
       
        
        return res.status(200).json({
            success:true,
            message:"User registered and now you have to verified the email"
        })
        



    } catch (error) {

        return res.status(500).json({

            message:"Internal server error catch"
        })
        
    }



}

//verify cantroller

export const verify=async (req,res)=>{

    try {
        const token=req.params.token;
        
        const user= await User.findOne({
           verification_token: token,
           verification_token_expires:  {$gt: Date.now()}
        })

        if(!user){
            return res.staus(400).json({
                success:false,
                message: "Token invalid"
            })
        }

        user.is_verified=true;
        user.verification_token=undefined;
        user.verification_token_expires=undefined;

        await user.save();

        return res.status(200).json({
            message:"User account is verified",
            success:true
        })

    } catch (error) {

        res.status(400).json({
            message: "Internal server error",
            successs:false
        })
        
    }
    
}


//login cantroller

export const login = async (req,res)=> {

    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message: "All fields are required"
        })
    }

    try {
        
        
        const user=await User.findOne({email});

        

        if(!user){
        return res.status(400).json({
            status: false,
            message: "User not found"
        })
    }

    console.log('user found');
    
    if(!user.is_verified){
        return res.status(400).json({
            status: false,
            message: "User not found"
        })
    }

    console.log('user is verified');
    
    const isPasswordMatched=await user.comparePassword(password);
    console.log("password matched : ",isPasswordMatched);
    
    
    if(!isPasswordMatched){
        return res.status(400).json({
            success:false,
            message:"password is incorrect"
        })
    }
    
    //jwt token
    
    // const jwtToken= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"20m"});

    //enhancement of jwt using access token and refresh token
    
    const accessToken= jwt.sign({id:user._id},process.env.ACCESSTOKEN_SECRET,{expiresIn:process.env.ACCESSTOKEN_EXPIRY});

    console.log(`access token :`,accessToken);
    

    const refreshToken=jwt.sign({id:user._id},process.env.REFRESHTOKEN_SECRET,{expiresIn:process.env.REFRESHTOKEN_EXPIRY})

    console.log(`refresh token : `,refreshToken);
    

    //store refreshtoken in db
     user.refreshToken=refreshToken;
    
    //jwt token stores in cookie
    
    const cookieOptions={
        
        httpOnly: true,
    }
    
    
    //res.cookie("jwtToken",jwtToken,cookieOptions);
    
    res.cookie("accessToken",accessToken,cookieOptions);
    res.cookie("refreshToken",refreshToken,cookieOptions);
    
    return res.status(200).json({
        message:"login successfull",
        success:true
    })
    
    } catch (error) {
       
        return res.status(500).json({
            message:"Internal server error occurs",
            success:false
        })
        
    }

}

export const getProfile=async(req,res)=>{
    //get user id from request object
    const userId=req.user.id
    const user=await User.findById(userId).select("-password");

    console.log("user => ",user);
    

    if(!user){
        return res.status(400).json({
            message:"password is not correct"
        })
    }

    return res.status(400).json({
        success:true,
        message:"User profile access"
    })
}

export const logout=async(req,res)=>{
    const token =req.cookies.refreshToken;

    if(!token){
        res.status(400).json({
            message:"Unauthorized user"
        })
    }

    try {

        //check if user is loggedin

        const refreshDecoded=jwt.verify(refreshToken,process.env.REFRESHTOKEN_SECRET);
        const user=await User.findOne({_id:refreshDecoded.id});

        if(!user){
            return res.status(400).json({
                message:"UnAuthorizes access"
            })
        }

        const cookieOptions={
            httpOnly:true
        }

        user.refreshToken=null;
        res.cookie("accessToken","",cookieOptions);
        res.cookie("refreshToken","",cookieOptions);

        return res.status(200).json({
            message:"User logout successfully"
        })

        
    } catch (error) {

        return res.status(400).status({
            message:"User logout failed"
        })
        

    }
}

