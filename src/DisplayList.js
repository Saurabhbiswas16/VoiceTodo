import React,{ useEffect, useState } from 'react';
import db from './firebase';



import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import { useStateValue } from './StateProvider';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    deleteIcon2: {
        '& svg': {
          fontSize: 30
        }
      }
  }));


function DisplayList() {
    const[{user},dispatch] =useStateValue();
    const [todos, setTodos] = useState([]);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState("paper");
    const [updateTodo, setupdateTodo] = useState({});
    const [input, setinput] = useState('')
    const descriptionElementRef = React.useRef(null);
   
    useEffect(() => {
      //  if(user){
       const unsubscribe= db.collection('todos')
        // .where('email', '==', user?.email)
        .orderBy('timestamp','desc').onSnapshot(snapshot=>{
            setTodos(snapshot.docs.map(doc=>({id:doc.id,todo:doc.data()})));
        }) 
        console.log("j"); 
        return ()=>{
          unsubscribe();
         }
      //  };
       
        
    }, [])

    useEffect(() => {
        if (open) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [open]);
      const handleClose = () => {
        setOpen(false);
        setinput('');
      };
      const onUpdate=(todo)=>{
        setupdateTodo(todo);
        setOpen(true);
      }
      const updated=()=>{
        db.collection('todos').doc(updateTodo.id).set({
            task:input
          },{merge:true})
          setOpen(false);
          setinput('');
      }
    const classes = useStyles();
    return (
        <>
        
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
        >
          <DialogTitle id="scroll-dialog-title">Update Todo</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div className="form-group">
                <TextField
                  type="text"
                  id="standard-basic"
                  label="New Task"
                  style={{ width: "500px" }}
                  autoFocus
                  margin="dense"
                //   placeholder={updateTodo.todo.task}
                  value={input}
                  onChange={(e)=>setinput(e.target.value)}
                  required
                  
                />
              </div>
              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
           
            <Button  onClick={updated} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog> 

      
        <div className={classes.root}>
            <List component="nav" >
                {todos.filter(filterTodo=>filterTodo.todo.email===user?.email).map(todo=>(
                    <>
                    <ListItem key={todo.todo.timestamp}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={todo.todo.task} />
                    <ListItemIcon>
                        <IconButton className={classes.deleteIcon2} onClick={()=>onUpdate(todo) }> <CreateIcon style={{ color: "green"}}/></IconButton>
                        <IconButton className={classes.deleteIcon2} onClick={()=>{db.collection('todos').doc(todo.id).delete()}}> <DeleteForeverIcon style={{ color: "red"}}/></IconButton>  
                    </ListItemIcon>
                    </ListItem>
                    <Divider/>
                    </>
                ))}
                
            </List>
            </div>
        </>
    )
}

export default DisplayList
