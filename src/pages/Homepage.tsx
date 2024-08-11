import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import '../mycss.css/'
import axios from 'axios';
import React from 'react';
import { nanoid } from 'nanoid';
import { Outlet, Link } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function Homepage(){
    const [radioval,setradioval]=useState('');
    const [workspaceid,setworkspaceid]=React.useState<String>(workspaceidchange);
    const [workspacename,setworkspacename]=useState('workspace');
    const workspacedata=useRef({});
    interface WorkspaceObject{
        workspacename:String;
        workspacelanguage:String;
        workspaceid:Number;
        workspacecode:String
    }
    const [boxworkspaces,setboxworkspaces]=React.useState<WorkspaceObject[]>([])
    useEffect(()=>{
        
            getworkspaces()
            console.log(boxworkspaces)
    },[])
    function changeradioval(e:BaseSyntheticEvent){
        setradioval(e.target.value)

    }
    function workspacenameval(e:BaseSyntheticEvent){
        setworkspacename(e.target.value)
    }
    function workspaceidchange(){
        let num:String=nanoid()
        return num
    }
   function createworkspacedata(){
    setworkspaceid(workspaceidchange)
    workspacedata.current={
        workspacename:workspacename,
        workspacelanguage:radioval,
        workspaceid:workspaceid,
        workspacecode:""
      }
    let obj=workspacedata.current  
    return obj
   }
    async function createworkspacenameval(data:any){
       return axios.post('http://localhost:1080/api/createworkspace', data,{
        headers: {
                'Content-Type': 'application/json',
                
            },'withCredentials':false }
        ).then(response => {
              console.log('Success:', response);
            }).catch((err)=>{
                console.log(err)
            })
    }
    function getworkspaces(){
        axios.get('http://localhost:1080/api/getworkspaces')
        .then((response)=>{
            setboxworkspaces(response.data)
            console.log(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    const clickevent=()=>{
           
                createworkspacedata()
                createworkspacenameval(workspacedata.current)
                .then(()=>{
                    console.log(workspacedata)
                    getworkspaces()
                    const notify = () => toast("Workspace Created");
                    notify();
                })
                
         }
    return(
        <div className="container">
            <h1 style={{color:'whitesmoke'}}>ProIDE</h1>
            <ToastContainer></ToastContainer>
            <div className="createworkspace">
                <form action="">
                    <label htmlFor="name">Workspace name:</label>
                    <input type="text" id='name' onChange={(e)=>{workspacenameval(e)}} />
                    <div className="radiogroup">
                       <h3>Set Language</h3>  
                        <div>
                        <label htmlFor="javascript">Javascript</label>
                        <input type="radio"  checked={radioval==='javascript'} name="" id="javascript" value={"javascript"}  onChange={(e)=>{changeradioval(e)}} />
                        </div>
                            <div>
                            <label htmlFor="typescript">Typescript</label>
                            <input type="radio" checked={radioval==='typescript'} className="lang" id="typescript" value={"typescript"} onChange={(e)=>{changeradioval(e)}} />
                            </div>
                            <div>
                            <label htmlFor="java">Java</label>
                            <input type="radio" checked={radioval==='java'} className="lang" id="java" value={"java"} onChange={(e)=>{changeradioval(e)}} />
                            </div>
                            <div>
                            <label htmlFor="php">PHP</label>
                            <input type="radio" checked={radioval==='php'} className="lang" id="php" value={"php"} onChange={(e)=>{changeradioval(e)}}/>
                            </div>
                            <div>
                            <label htmlFor="csharp">csharp</label>
                            <input type="radio" checked={radioval==='csharp'} className="lang" id="csharp" value={"csharp"} onChange={(e)=>{changeradioval(e)}} />
                            </div>
                            <div>
                            <label htmlFor="python">Python</label>
                            <input type="radio" checked={radioval==='python'} className="lang" id="python" value={"python"} onChange={(e)=>{changeradioval(e)}} />
                            </div>
                    </div>
                </form>
                <button onClick={()=>{clickevent()}} >Create Workspace</button>
            </div>
            <h1>Workspaces</h1>

            <div className="workspaces">
            {   
                boxworkspaces?
                boxworkspaces.map((i)=>{
                    const data={id:i.workspaceid,name:i.workspacename,language:i.workspacelanguage,code:i.workspacecode}
                    return <div className="workspacebox" key={String(i.workspaceid)} id={String(i.workspaceid)}>
                    <div>
                    <h1>{i.workspacename}</h1>
                    <h3>Language:{i.workspacelanguage}</h3>
                    </div>
                    <button><Link to="workspace" state={data}>Go to Workspace</Link></button>
                    
                   </div>
                }):null
            }
               
            </div>
        </div>
    )
}

export default Homepage