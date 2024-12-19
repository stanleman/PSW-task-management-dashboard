"use client"

import { useState } from "react"

function EditForm({ task, setUpdate }) {
    const [editTask, setEditTask] = useState(task)

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const tasks = JSON.parse(localStorage.getItem("task"))

        const taskIndex = tasks.findIndex((task) => task.id === editTask.id);

        if (taskIndex !== -1) {
            tasks[taskIndex] = editTask;
            localStorage.setItem("task", JSON.stringify(tasks));
            console.log("Task updated successfully!");
        } else {
            console.log("Task not found!");
        }

        setUpdate(true)
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <input required value={editTask.name} onChange={(e) => {
                setEditTask({ ...editTask, name: e.target.value })
                console.log(editTask)
            }} />
            <button>✅</button>
        </form>
    )
}

export default EditForm