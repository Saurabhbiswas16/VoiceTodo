import React from 'react'
import Header from './Header'
import AddTodo from './AddTodo'

import "./Todo.css"
function Todo() {
    return (
        <>
            <div className="todo">
                <Header/>
                <div className="todo_body">
                    <AddTodo/>                   
                </div>
           </div> 
        </>
    )
}

export default Todo
