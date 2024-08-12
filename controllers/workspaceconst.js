import { workspacemodel } from "../models/model.js";
import mongoose from "mongoose";
export const createworkspace=async (req,res)=>{
    const workspace=new workspacemodel();
    workspace.workspacename=req.body.workspacename;
    workspace.workspacelanguage=req.body.workspacelanguage;
    workspace.workspaceid=req.body.workspaceid;
    workspace.workspacecode=req.body.workspacecode;
    workspace.save()
    .then((response)=>{
        console.log(response)
        res.status(201).json({ message: 'Workspace created successfully' });
    }).catch((error)=>{
        console.log(error)
        res.status(501).json({ message: 'Workspace not created successfully' });
    })
}

export async function getworkspaces(req,res){
   
    workspacemodel.find({})
    .then((response)=>{
        console.log(response)
   
        res.send(response)
    }).catch((err)=>{
        console.log(err)
        res.sendStatus(501)
    })
}

export async function deleteworkspaces(req,res){
   
    workspacemodel.deleteMany({})
    .then((response)=>{
        console.log(response)
        res.sendStatus(201)
    }).catch((err)=>{
        console.log(err)
        res.sendStatus(501)
    })
}

export async function updateworkspacecode(req,res){
    const filter={workspaceid:req.body.workspaceid}
    const code={['workspacecode']: req.body.workspacecode } 
    workspacemodel.findOneAndUpdate(filter,code,{ new: true })
    .then((response)=>{
        console.log(response)
        res.sendStatus(201)
    }).catch((err)=>{
        console.log(err)
        res.sendStatus(501)
    })
}