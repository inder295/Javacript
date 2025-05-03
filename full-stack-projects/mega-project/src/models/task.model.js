import mongoose,{Schema} from "mongoose";
import { AvailableTaskStatus,TaskStatusEnum } from "../utils/constants.js";

const taskSchema =new Schema({
   title:{
    type:String,
    required:true,
    trim:true
   },
   descrption:{
    type:String,
    required:true,
    trim:true
   },
   project:{
    type:Schema.Types.ObjectId,
    ref:"Project",
    required:[true,"Project ref is required"]


   },
   assignedTo:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true


   },
   assignedBy:{
    type:Schema.Types.ObjectId,
    ref:"User", 
    required:true
   },
   Status:{
    type:String,
    enum:AvailableTaskStatus,
    default:TaskStatusEnum.TODO 
   },
   attachements:{
    type:[{
        url:String,
        mimeType:String, //.png .jpg .webp .pdf .docx .xlsx .pptx .txt
        size:Number
    }],
    default:[]
   }, 

},{
    timestamps:true
})


export const Task=mongoose.model("Task",taskSchema);