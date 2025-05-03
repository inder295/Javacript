import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema =new mongoose.Schema({ 
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    verification_token:{
        type:String
    },
    verification_token_expires:{
        type:Date
    },
    refreshToken:{
        type:String
    }

    
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
     //this refres to the current user document
    if(this.isModified("password")){
         this.password=await bcrypt.hash(this.password,10)
    }

    next();
})

userSchema.method.comaparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

const User=mongoose.model("User",userSchema);

export default User;