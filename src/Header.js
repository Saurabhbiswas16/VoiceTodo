import React, { useState } from 'react'
import  './Header.css';
import { Button } from '@material-ui/core';
import {auth,provider} from './firebase';
import { useStateValue } from './StateProvider';
import {actionTypes} from './reducer';
function Header() {
    const[{user},dispatch] =useStateValue();

    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=> {
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        })
        .catch((error)=>alert("Some problem,Please try again!!!!!"))
    }
    const signOut=()=>{
        window.location.reload();
    };
    return (
        <>

            <div className="header"> 
            { !user?(
                 <Button variant="contained" color="primary" size="small" onClick={signIn}>Login</Button> 
            ):(
                <>
                <p>{user?.email}</p>
                <Button variant="contained" color="primary" size="small" onClick={signOut}>Logout</Button>
                </>
            )
            }
            </div>
        </>
    )
}

export default Header
