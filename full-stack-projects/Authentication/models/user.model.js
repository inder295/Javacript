import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    name :{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minLength:6
        
    },
    phone_number:{
        type:String,
        require:true,
        trim:true,
        
    },
    role:{
       type:String,
       enum:["user","password"],
       default:"user"
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    verification_token:{
        type:String,
        
    },
    verification_token_expires:{
        type:Date
    },
    refreshToken:{
        type:String 
    },
    
},{
    timestamps:true
})

userSchema.pre("save",async function(next){

    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
    }
  next()  
})

userSchema.methods.comparePassword=async function(password){
    
     return  await bcrypt.compare(password,this.password)
    
}

const User=mongoose.model("User",userSchema);
export default User;