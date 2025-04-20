import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import cookieParser from "cookie-parser";

dotenv.config();
 
 const isLogedin=async (req,res,next)=>{

    //take jwt from cookie

    

    try {
         
        
       // const token=req.cookies.jwtToken;
       
        const accessToken=req.cookies.accessToken;
        const refreshToken=req.cookies.refreshToken;

        console.log("access= ",accessToken);
        console.log("refresh= ",refreshToken);
        

      
        

        
    /*    if(!token){
            return res.status(400).json({
                success:false,
                message:"Token Invalid" 
            })
        }
        
        //verify token is valid
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next(); */

    
//check accces token-> if user has than directly give permision of login and give new access and refresh token
//if user not have access token than check refresh -> if it has refresh token -> than gave him new access and refresh token
//agr dono nai hai than user se bolo dobara login kare

if(!accessToken && !refreshToken){
    return res.status(400).json({
        message: "Unauthorized acccess"
    })
}

if(!accessToken){
    const refreshDecoded=await jwt.verify(refreshToken,process.env.REFRESHTOKEN_SECRET);
    console.log(refreshDecoded.id);


const user=await User.findOne({_id:refreshDecoded.id});


console.log("user = this =",user);

//if user not have access and refresh token 
if(!user){
    return res.status(400).json({
        success:false,
        message:"Unauthorized User"
    })
}

//malke new acess and refresh token

const newAccessToken=jwt.sign({id:user._id},process.env.ACCESSTOKEN_SECRET,{expiresIn:"10m"});
const newRefreshToken=jwt.sign({id:user._id},process.env.REFRESHTOKEN_SECRET,{expiresIn:"24h"});

 user.refreshToken=newRefreshToken;

 await user.save();

 const cookieOptions={
    httpOnly:"true"
 }
  
 res.cookie("accessToken",newAccessToken,cookieOptions);
 res.cookie("refreshToken",newRefreshToken,cookieOptions);
 req.user=refreshDecoded;
 next();

}else{
  
    const accessDecoded= jwt.verify(accessToken,process.env.ACCESSTOKEN_SECRET);

    const user=await User.findOne({_id:accessDecoded.id});

    if(!user){
        return res.status(400).json({
            success:false,
            message:"Unauthorized user"
        })
    }

    const newAccessToken= jwt.sign({id:user._id},process.env.ACCESSTOKEN_SECRET,{expiresIn:"10m"});
    const newRefreshToken= jwt.sign({id:user._id},process.env.REFRESHTOKEN_SECRET,{expiresIn:"24h"});

    user.refreshToken=newRefreshToken;
    await user.save();

    const cookieOptions={
        httpOnly:true
    }
    res.cookies("accessToken",newAccessToken,cookieOptions);
    res.cookies("refreshToken",newRefreshToken,cookieOptions);
    req.user=accessDecoded;
    next();


}
        



        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Internal server error"

        })    
    }

}

export default isLogedin;