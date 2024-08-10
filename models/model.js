import mongoose from "mongoose";
const workspaceschema=mongoose.Schema({
    workspacename:{type:String},
    workspacelanguage:{type:String},
    workspaceid:{type:String},
    workspacecode:{type:String}
})
let workspacemodel=mongoose.model('workspace',workspaceschema,'workspace')
export {workspacemodel}