import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const port=process.env.PORT || 4000;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
    methods:['GET','POST','OPTIONS','DELETE'],
    allowedHeaders:['Content-Type','Authorization']


}));

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.get('/inder',(req,res)=>{
    res.send('Hello Inder');
})



app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
    
})
