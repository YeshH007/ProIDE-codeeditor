import axios from 'axios';
import { BaseSyntheticEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Editor } from '@monaco-editor/react';
import './App.css'
import { languages,codesnippets,Languagetypes } from './data';
import { useLocation } from 'react-router';
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location=useLocation();
  const [output,setoutput]=useState('')
  const [theme,settheme]=useState('vs-light');
  const [language,setlanguage]=useState('js')
  const langversion:String=String(location.state.language)
  const [languageversion,setlanguageversion]=useState(languages[langversion as keyof Languagetypes])
  const [code,setCode]=useState('');

  const textarearef=useRef<HTMLTextAreaElement|null>(null);

  function changelanguage(lang:string){
    setlanguage(lang)
  }
  function changetextareatheme(){
    if(textarearef.current){
      if(textarearef.current.style.color=='black' &&textarearef.current.style.backgroundColor=='white' ){
      textarearef.current.style.color='white'
      textarearef.current.style.backgroundColor='black'
      }else{
      textarearef.current.style.color='black'
      textarearef.current.style.backgroundColor='white'
      }

    }
    
  }
  async function handleRun() {
 
    const API = axios.create({
      baseURL: "https://emkc.org/api/v2/piston",
    });
      const response = await API.post("/execute", {
        language: location.state.language,
        version:languageversion ,
        files: [
          {
            content: code,
          },
        ],
      });
      console.log(response.data)
      setoutput(response.data.run.output)
      return response.data;
}
interface WorkspaceObject{
  workspacename:String;
  workspacelanguage:String;
  workspaceid:Number;
  workspacecode:String
}
function reload(){
  axios.get('http://localhost:1080/api/getworkspaces')
  .then((response)=>{
    response.data.map((i:WorkspaceObject)=>{
      if(i.workspaceid==location.state.id){
        setCode((prev)=>{
          prev=String(i.workspacecode)
          return prev}
        )
       
      }
    })

})
.catch((err)=>{
    console.log(err)
})
}  
  useEffect(()=>{
    if(textarearef.current){
      textarearef.current.style.color='black'
      textarearef.current.style.backgroundColor='white'
}
    reload()
  },[])
  async function savecode(){
    axios.put('http://localhost:1080/api/updateworkspace',{
      workspaceid:location.state.id,
      workspacecode:code
    }).then((res)=>{
      console.log(res)
      const notify = () => toast("Code Saved");
      notify();
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (

      <div className="editorcontainer">
        <ToastContainer></ToastContainer>
          <div className="editorbox">
          <h1 className='workspacename'>{location.state.name}</h1>
          <div className='subcontainer'>
          <h3>Language:{location.state.language}</h3>  
          <div className='buttonscontainer'>
          <button className='themebutton' onClick={()=>{(theme=='vs-light'? settheme('vs-dark')  :settheme('vs-light')),changetextareatheme()}} >Change theme</button>
          <button onClick={savecode} className='savebutton'>Save Code</button>
          </div>
          </div>
            <Editor 
            
              height="95vh"
              width="45vw"

              language={location.state.language}
              theme={theme}
     
              value={code}
              
              onChange={(value)=>{setCode(value||'')}}
            ></Editor>            
        </div>
        <div className="outputcontainer">
          <h3>Output:</h3>
          <button  className='runbutton' onClick={handleRun}>Run</button>  
          <textarea disabled className='textarea' value={output}  ref={textarearef}>
          </textarea>
        </div>
      </div>

  )
}

export default App
