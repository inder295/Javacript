import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import crypto from "crypto";

const userSchema =new Schema({

   avatar:{
    type:{
        url: String,
        localpath: String,

    }, 
    default:{
        url:`https://placehold.co/600x400`,
        localpath: ""
    }

   },

   username:{
     type:String,
     require:true,
     unique:true,
     lowercase:true,
     trim :true,
      

   },
email:{
    type:String,
    require:true,
    unique:true,
    lowercase:true,
    trim :true,
    index:true,
},
fullname:{
    type:String,
    require:true,
    trim :true,
},
password:{
    type:String,
    require:[true,"Password is required"],
   
},
isEmailVerified:{
    type:Boolean,
    default:false
},
forgotPasswordToken:{
    type:String,
    
},
forgotPasswordTokenExpiry:{
    type:Date,
    
},
refreshToken:{
    type:String
},
accessToken:{
    type:String
},
emailVerificationToken:{
    type:String,
    
},
emailVerificationExpiry:{
    type:Date
}


})

userSchema.pre("save",async function(next){
     
    if(!this.isModified("password")){
        return next();
     }

     this.password=bcrypt.hash(this.password,10);
     next();

})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({_id:this._id,username:this.username,email:this.email,},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY},
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({_id:this._id,username:this.username,email:this.email,},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY},
    )
}

userSchema.methods.generateTemporaryToken=function(){
    const unHashedToken=crypto.randomBytes(20).toString("hex");

   const hashedToken= crypto.createHash("sha256").update(unHashedToken).digest("hex")
   const tokenExpiry=Date.now() + (20*60*1000); // 20 minutes

   return {hashedToken,unHashedToken,tokenExpiry}
}



export const User=mongoose.model("User",userSchema);