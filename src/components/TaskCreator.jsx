import React, { useState } from 'react'

export const TaskCreator = (props) => {

    const [newTaskName, setNewTaskName] = useState('')

    const updateNewTaskValue = (event) => {
        setNewTaskName(event.target.value)
    }

    const createNewTask = () => {
        props.createNewTask(newTaskName)
        setNewTaskName('')
    }

    return (
        <div className="p-4">
            <input 
                type="text" 
                className="form-control" 
                value={newTaskName}
                onChange={updateNewTaskValue}
            />
            <button 
                className="btn btn-primary mt-1"
                onClick={createNewTask}
            >
                Add
            </button>
        </div>
    )
}