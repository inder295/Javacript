import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

const isLogedin=async(req,res,next)=>{

    try {
        
        //const token=req.coookies.token;
        // if(!token){
        //     return res.status(401).json({
        //         message:"unathoariezed user"
        //     })
        // }

        // const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        // req.user=decoded;
        // next();
        
        const accessToken=req.cookies.accessToken;
        const refreshToken=req.cookies.refreshToken;

        if(!accessToken){
             if(!refreshToken){
                return res.status(401).json({
                    message:"unathoariezed user"
                })
        }
        const refreshDecoded=jwt.verify(refreshToken,process.env.REFRESHTOKEN_SECRET);
        console.log(refreshDecoded.id);

        const user=await User.findOne({_id:refreshDecoded.id});
        console.log(user.email);

        if(!user){
            return res.status(401).json({
                message:"unathoariezed access"
            })
        }

        const newAccessToken= jwt.sign({id:user._id},process.env.ACCESSTOKEN_SECRET,{expiresIn:process.env.ACCESSTOKEN_EXPIRY});
        
        const newRefreshToken=jwt.sign({id:user._id},process.env.REFRESHTOKEN_SECRET,{expiresIn:process.env.REFRESHTOKEN_EXPIRY})
        
        user.refreshToken=newRefreshToken;
        await user.save();
            
            //jwt token stores in cookie
            
        const cookieOptions={
            httpOnly: true,
        }
        
        res.cookie("accessToken",newAccessToken,cookieOptions);
        res.cookie("refreshToken",newRefreshToken,cookieOptions);

        req.user=refreshDecoded;
        
        return res.status(200).json({
            message:"login successfull",
            success:true
        })
                   

        }else{
            const accessDecoded=jwt.verify(accessToken,process.env.ACCESSTOKEN_SECRET);
            const user=await User.findOne({_id:accessDecoded.id});
            if(!user){
                return res.status(401).json({
                    message:"unathoariezed access"
                })
            }

            const newAccessToken= jwt.sign({id:user._id},process.env.ACCESSTOKEN_SECRET,{expiresIn:process.env.ACCESSTOKEN_EXPIRY});
            const newRefreshToken=jwt.sign({id:user._id},process.env.REFRESHTOKEN_SECRET,{expiresIn:process.env.REFRESHTOKEN_EXPIRY})

            user.refreshToken=newRefreshToken;
            await user.save();

            const cookieOptions={
                httpOnly: true,
            }

            res.cookie("accessToken",newAccessToken,cookieOptions);
            res.cookie("refreshToken",newRefreshToken,cookieOptions);
            req.user=accessDecoded;

            next(); 
        }


    


    
    } catch (error) {

        return res.status(401).json({
            message:"unathoariezed user"
        })
        
    }
}

export default isLogedin;