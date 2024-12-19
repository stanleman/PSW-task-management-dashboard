"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("high");
  const [input, setInput] = useState("");

  const onClickHandler = (e) => {
    e.preventDefault();
    let temp = [...tasks];
    temp.push({
      id: uuidv4(),
      name: input,
      priority: priority,
      completed: false,
    });

    setTasks(temp);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold m-5">Task Priority Queue</h1>
      <form className="flex">
        <input
          className="mx-5 border border-black w-[40%]"
          onChange={(e) => setInput(e.target.value)}
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
          onClick={onClickHandler}
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
                        task.priority = "medium";
                      }
                    });

                    setTasks(temp);
                  }}
                  className="text-xl"
                >
                  ⬇️
                </button>

                <button
                  onClick={() => {
                    setTasks(tasks.filter((t) => t.id !== task.id));
                  }}
                  className="text-xl"
                >
                  🗑️
                </button>
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

                    setTasks(temp);
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

                    setTasks(temp);
                  }}
                  className="text-xl"
                >
                  ⬇️
                </button>

                <button
                  onClick={() => {
                    setTasks(tasks.filter((t) => t.id !== task.id));
                  }}
                  className="text-xl"
                >
                  🗑️
                </button>
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
                        task.priority = "medium";
                      }
                    });

                    setTasks(temp);
                  }}
                  className="text-xl"
                >
                  ⬆️
                </button>

                <button
                  onClick={() => {
                    setTasks(tasks.filter((t) => t.id !== task.id));
                  }}
                  className="text-xl"
                >
                  🗑️
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
