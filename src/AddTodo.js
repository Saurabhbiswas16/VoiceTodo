import React, { useState } from 'react';
import db from './firebase';
import firebase from 'firebase';
import "./AddTodo.css";
import DisplayList from './DisplayList';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { useStateValue } from './StateProvider';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),      
      },
    },
    deleteIcon2: {
        '& svg': {
          fontSize: "3vw"
        },
        
      }
  }));

function AddTodo() {
  const [input, setInput] = useState("");
  const [speaking, setspeaking] = useState(false);
  const[{user},dispatch] =useStateValue();


  const onCreate=(e)=>{
    e.preventDefault();
    db.collection('todos').add({
      task:input,
      email:user?.email,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
     setInput("");
    
  }

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      // if (transcript.indexOf('new') == 0) {
        if (e.results[0].isFinal) {
          let todo = transcript;
            if (todo != "") {
               
               db.collection('todos').add({
                task:todo,
                email:user?.email,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
              });
              
              setspeaking(false);
            }
         
        }
      // }

    });

    const speak=()=>{
      setspeaking(true)
      recognition.start();
    }
    const over=()=>{
      setspeaking(false)
      recognition.stop();
    }
  
    const classes = useStyles();
    return (
        <>
        {user?
          <>
            <div className="addTodo">
              <form  className={classes.root} noValidate autoComplete="off">
                  <TextField id="standard-basic" label="Write your todo" style={{ width: "30vw"}} value={input} onChange={event=>setInput(event.target.value)}/>
                  <IconButton tooltip="Click to Add new todo" className={classes.deleteIcon2} disabled={!input} onClick={onCreate}><AddBoxIcon style={{ color: "blue"}}/></IconButton>
                  <IconButton tooltip="Click to Add new todo" className={classes.deleteIcon2}  onClick={()=>{
                    speaking?over():speak()
                    
                  }}>
                    {speaking?<MicIcon style={{ color: "blue"}}/>:<MicOffIcon style={{ color: "black"}}/>}
                    
                  </IconButton>
            </form> 
           </div> 
           <DisplayList/>
           </>
           :null}
        </>
    )
}

export default AddTodo
