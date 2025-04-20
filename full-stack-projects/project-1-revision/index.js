import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/users.routes.js'
import db from './utils/db.js';

dotenv.config();
const port=process.env.PORT ||4000;

const app=express();
app.use(express.json());

db();

app.use('/api/v1/users',userRoute);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})
