"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import Task from "../components/Task";
import Script from 'next/script'
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("high");
  const [input, setInput] = useState("");
  const [update, setUpdate] = useState(false)
  const [inputDate, setInputDate] = useState(formatDate(Date.now()))

  const moveTask = (id, dir) => {
    const tempTask = tasks.find(task => task.id === id)
    const tempAllTasks = tasks.filter(task => task.id != id)
    if (dir === "up") {
      if (tempTask.priority === "low") {
        tempTask.priority = "medium"
      } else {
        tempTask.priority = "high"
      }
    } else {
      if (tempTask.priority === "high") {
        tempTask.priority = "medium"
      } else {
        tempTask.priority = "low"
      }
    }
    tempAllTasks.push(tempTask)
    setTasks(tempAllTasks)
    localStorage.setItem('task', JSON.stringify(tempAllTasks))
    setUpdate(true)
  }

  useEffect(() => {
    if (!localStorage.getItem('task')) {
      setTasks([])
    } else {
      setTasks(JSON.parse(localStorage.getItem('task')))
    }
    setUpdate(false)
  }, [update])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let temp = [...tasks];
    temp.push({
      id: uuidv4(),
      name: input,
      priority: priority,
      completed: false,
      date: inputDate
    });
    setInput('')

    localStorage.setItem('task', JSON.stringify(temp))
    setUpdate(true)
    toast("Task added!", { type: 'success' })
  };

  return (
    <>
      <ToastContainer />
      <div className="m-4">
        <h1 className="text-4xl font-bold m-5">Task Priority Queue</h1>
        <form className="flex w-[98%] gap-2 mx-auto" onSubmit={onSubmitHandler}>
          <input
            required
            className="border border-black w-full px-3"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Start adding a task"
          />

          <input type="date"
            className="border border-black px-3"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
          />

          <select
            className="w-[100px] border border-black px-3"
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button
            type="submit"
            className="text-lg px-3 py-2  bg-blue-500 border border-black text-white text-nowrap"
          >
            Add task
          </button>
        </form>
        <Accordion className="mt-5" defaultExpandedKeys={['High', 'Medium', 'Low']} variant="splitted" selectionMode="multiple">
          {['High', 'Medium', 'Low'].map((priority) => {
            return (
              <AccordionItem key={priority} aria-label={priority} title={<h2 className="text-lg font-semibold">{priority + " Priority"}</h2>}>
                {tasks.filter(t => t.priority == priority.toLowerCase()).length > 0 ? tasks.filter(t => t.priority == priority.toLowerCase()).sort((a, b) => {
                  if (a.completed && !b.completed) {
                    return 1;
                  } else if (!a.completed && b.completed) {
                    return -1;
                  } else {
                    return 0
                  }
                }).map((task) => {
                  return (
                    <div key={task.id}>
                      <Task task={task} tasks={tasks} setUpdate={setUpdate} moveTask={moveTask} />
                      <div className="h-[10px]"></div>
                    </div>
                  );
                }) : <h2 className="mb-3 opacity-80">No tasks found</h2>}
              </AccordionItem>
            )
          })}
        </Accordion>
        <Script src="https://kit.fontawesome.com/7629b30e08.js" crossorigin="anonymous" />
      </div>
    </>
  );
}

export default App;
