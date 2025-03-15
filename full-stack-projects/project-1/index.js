import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import db from './utils/db.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const port=process.env.PORT || 4000;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: process.env.BASE_URL,
    credentials:true,
    methods:['GET','POST','OPTIONS','DELETE'],
    allowedHeaders:['Content-Type','Authorization']


}));

db();

app.use('/api/v1/users',userRoute)

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
    
})
