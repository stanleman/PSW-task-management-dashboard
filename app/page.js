"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import EditForm from "./editForm";

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

    localStorage.setItem('task', JSON.stringify(temp))
    setUpdate(true)
  };

  return (
    <div>
      <h1 className="text-4xl font-bold m-5">Task Priority Queue</h1>
      <form className="flex" onSubmit={onSubmitHandler}>
        <input
          required
          className="mx-5 me-1 border border-black w-[40%]"
          onChange={(e) => setInput(e.target.value)}
        />

        <input type="date"
          className="mx-5 ms-1 border border-black"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />

        <select
          className="w-[100px]"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          type="submit"
          className="mx-3 text-lg px-3 py-2  bg-blue-500 border border-black text-white"
        >
          Add task
        </button>
      </form>

      <div className="m-5 mt-10">
        <h2 className="text-lg font-semibold">High Priority</h2>
        {tasks.map((task) => {
          if (task.priority == "high") {
            return (
              <div className="flex gap-3 items-center " key={task.id}>
                <div className={`m-0 p-0 ${task.completed && "line-through"}`}>
                  {task.name}
                </div>
                <div className={`m-0 p-0 ${task.completed && "line-through"}`}>
                  ( Due date: {task.date} )
                </div>
                <button
                  onClick={() => {
                    let temp = [...tasks];

                    temp.map((i) => {
                      if (i.id == task.id) {
                        i.completed = !i.completed;
                      }
                    });

                    localStorage.setItem('task', JSON.stringify(temp))
                    setUpdate(true)
                  }}
                  className="text-xl"
                >
                  {task.completed ? "❌" : "✅"}
                </button>

                <button
                  onClick={() => {
                    let temp = [...tasks];
                    temp.map((t) => {
                      if (t.id == task.id) {
                        task.priority = "medium";
                      }
                    });

                    localStorage.setItem('task', JSON.stringify(temp))
                    setUpdate(true)
                  }}
                  className="text-xl"
                >
                  ⬇️
                </button>

                <button
                  onClick={() => {
                    localStorage.setItem('task', JSON.stringify(tasks.filter((t) => t.id !== task.id)))
                    setUpdate(true)
                  }}
                  className="text-xl"
                >
                  🗑️
                </button>

                <EditForm task={task} setUpdate={setUpdate} />
              </div>
            );
          }
        })}
      </div>

      <div className="m-5 mt-10">
        <h2 className="text-lg font-semibold">Medium Priority</h2>
        {tasks.map((task) => {
          if (task.priority == "medium") {
            return (
              <div className="flex gap-3 items-center " key={task.id}>
                <div className={`m-0 p-0 ${task.completed && "line-through"}`}>
                  {task.name}
                </div>
                <div className={`m-0 p-0 ${task.completed && "line-through"}`}>
                  ( Due date: {task.date} )
                </div>
                <button
                  onClick={() => {
                    let temp = [...tasks];

                    temp.map((i) => {
                      if (i.id == task.id) {
                        i.completed = !i.completed;
                      }
                    });

                    setTasks(temp);
                  }}
                  className="text-xl"
                >
                  {task.completed ? "❌" : "✅"}
                </button>

                <button
                  onClick={() => {
                    let temp = [...tasks];
                    temp.map((t) => {
                      if (t.id == task.id) {
                        task.priority = "high";
                      }
                    });

                    localStorage.setItem('task', JSON.stringify(temp))
                    setUpdate(true)
                  }}
                  className="text-xl"
                >
                  ⬆️
                </button>

                <button
                  onClick={() => {
                    let temp = [...tasks];
                    temp.map((t) => {
                      if (t.id == task.id) {
                        task.priority = "low";
                      }
                    });

                    localStorage.setItem('task', JSON.stringify(temp))
                    setUpdate(true)
                  }}
                  className="text-xl"
                >
                  ⬇️
                </button>

                <button
                  onClick={() => {
                    localStorage.setItem('task', JSON.stringify(tasks.filter((t) => t.id !== task.id)))
                    setUpdate(true)
                  }}
                  className="text-xl"
                >
                  🗑️
                </button>

                <EditForm task={task} setUpdate={setUpdate} />

              </div>
            );
          }
        })}
      </div>

      <div className="m-5 mt-10">
        <h2 className="text-lg font-semibold">Low Priority</h2>
        {tasks.map((task) => {
          if (task.priority == "low") {
            return (
              <div className="flex gap-3 items-center " key={task.id}>
                <div className={`m-0 p-0 ${task.completed && "line-through"}`}>
                  {task.name}
                </div>
                <div className={`m-0 p-0 ${task.completed && "line-through"}`}>
                  ( Due date: {task.date} )
                </div>
                <button
                  onClick={() => {
                    let temp = [...tasks];

                    temp.map((i) => {
                      if (i.id == task.id) {
                        i.completed = !i.completed;
                      }
                    });

                    localStorage.setItem('task', JSON.stringify(temp))
                    setUpdate(true)
                  }}
                  className="text-xl"
                >
                  {task.completed ? "❌" : "✅"}
                </button>

                <button
                  onClick={() => {
                    let temp = [...tasks];
                    temp.map((t) => {
                      if (t.id == task.id) {
                        task.priority = "medium";
                      }
                    });

                    localStorage.setItem('task', JSON.stringify(temp))
                    setUpdate(true)
                  }}
                  className="text-xl"
                >
                  ⬆️
                </button>

                <button
                  onClick={() => {
                    localStorage.setItem('task', JSON.stringify(tasks.filter((t) => t.id !== task.id)))
                    setUpdate(true)
                  }}
                  className="text-xl"
                >
                  🗑️
                </button>

                <EditForm task={task} setUpdate={setUpdate} />

              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
