import { createworkspace,deleteworkspaces,getworkspaces, updateworkspacecode } from "../controllers/workspaceconst.js";
import express from 'express'

const app=express()
const router=express.Router()

router
.get("/",(req,res)=>{
  res.send("server connected");
}) 
.post('/api/createworkspace',createworkspace)
.get('/api/getworkspaces',getworkspaces)
.put('/api/updateworkspace',updateworkspacecode)
.delete('/api/deleteworkspaces',deleteworkspaces)


export {router}

