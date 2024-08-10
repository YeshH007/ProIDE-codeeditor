import express from 'express'
import mongoose from 'mongoose';
import { router } from './routes/route.js';
import bodyparser from 'body-parser'
import cors from 'cors';
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: false, 
    optionsSuccessStatus: 200 
    ,
  };
  
const app=express()
app.use(express.json())
app.use(router)
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors(corsOptions))
app.options('*', cors(corsOptions));

mongoose.connect('mongodb+srv://myuser:rgmZzSNKQ0q77Tqw@cluster1.jnfhdma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
.then((response)=>{
    console.log('db connected')
}).catch((err)=>{console.log(err)})




app.listen(1080,()=>{
    console.log('server running')
})