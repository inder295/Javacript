import {ApiResponse} from '../utils/api-response.js'

const healthcheck=async (req,res)=>{

   try {
      

      
      res.send(200).json(
         new ApiResponse(200,{message},"server is running.")
      )
      
   } catch (error) {
      
   }
     
}

export {healthcheck};