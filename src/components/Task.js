import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    DatePicker,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

const Task = ({ task, tasks, setUpdate, moveTask }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [editTask, setEditTask] = useState(task.name)
    const [taskDate, setTaskDate] = useState(task.date)
    const [priority, setPriority] = useState(task.priority)

    const onSubmitHandler = (type, value) => {
        const tempTasks = JSON.parse(localStorage.getItem("task"))

        const taskIndex = tempTasks.findIndex((z) => task.id === z.id);

        if (taskIndex !== -1) {
            if (type == 'name') {
                tempTasks[taskIndex]['name'] = editTask;
            } else if(type == 'date') {
                tempTasks[taskIndex]['date'] = value;
            } else if(type == 'priority') {
                tempTasks[taskIndex]['priority'] = value;
            }
            localStorage.setItem("task", JSON.stringify(tempTasks));
            console.log("Task updated successfully!");
        } else {
            console.log("Task not found!");
        }
        setUpdate(true)
    }
    return (
        <>
            <div element-type="task" className="relative flex items-center justify-between bg-slate-200 rounded-sm p-3 cursor-pointer" onClick={(e) => {
                if (e.target.getAttribute('element-type') !== 'task') return
                onOpen()
            }}>
                <div className="gap-3 flex">
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
                        className="text-xl border-0"
                    >
                        {!task.completed ? <i className="fa-regular fa-circle"></i> : <i className="fa-regular fa-circle-check"></i>}
                    </button>
                    <div>
                        <div element-type="task" className={`m-0 p-0 ${task.completed && "line-through"}`}>
                            {task.name}
                        </div>
                        <div element-type="task" className={`flex items-center gap-1 m-0 p-0 text-xs ${(new Date() > new Date(task.date) && !task.completed) && "text-red-500"}`}>
                            <i className="fa-solid fa-calendar"></i> {(new Intl.DateTimeFormat('en-US', {
                                weekday: 'short', month: 'short', day: 'numeric'
                            })).format(new Date(task.date))}
                        </div>
                    </div>
                </div>

                <div className="gap-3 flex">
                    <button className={`border-0 ${(task.priority == "high") && "opacity-60"}`} onClick={() => moveTask(task.id, "up")} disabled={task.priority == "high"}>⬆️</button>
                    <button className={`border-0 ${(task.priority == "low") && "opacity-60"}`} onClick={() => moveTask(task.id, "down")} disabled={task.priority == "low"}>⬇️</button>
                    <button
                        onClick={() => {
                            localStorage.setItem('task', JSON.stringify(tasks.filter((t) => t.id !== task.id)))
                            setUpdate(true)
                            toast("Deleted the todo!", { type: 'success' })
                        }}
                        className="text-xl"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={false}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1 mt-5">
                                <div className="relative flex gap-3">
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
                                        {!task.completed ? <i className="fa-regular fa-circle"></i> : <i className="fa-regular fa-circle-check"></i>}
                                    </button>
                                    <input onBlur={() => onSubmitHandler("name")} className={`w-full ring-slate-400 ${task.completed && "line-through"}`} required value={editTask} onChange={(e) => {
                                        setEditTask(e.target.value)
                                    }} />
                                    <div className="absolute top-0 right-0 pointer-events-none">🖋️</div>
                                </div>
                            </DrawerHeader>
                            <DrawerBody>
                                <div className="relative flex items-center bg-slate-200 rounded-sm">
                                    <input type="date"
                                        className="bg-transparent w-full p-3 cursor-pointer"
                                        value={taskDate}
                                        onChange={(e) => {
                                            setTaskDate(e.target.value)
                                            onSubmitHandler('date', e.target.value)
                                        }}
                                    />
                                </div>
                                {/* <div className="relative flex items-center bg-slate-200 rounded-sm">
                                    <select
                                        className="bg-transparent w-full p-3 me-3 cursor-pointer"
                                        value={priority}
                                        onChange={(e) => {
                                            setPriority(e.target.value)
                                            onSubmitHandler('priority', e.target.value)
                                        }}
                                    >
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div> */}
                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="default" variant="shadow" onPress={onClose}>
                                    Close
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Task