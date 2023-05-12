import Head from 'next/head';
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { TodoType } from "../types/index";

const Todos = () => {
    const [todoItems, setTodoItems] = useState<TodoType[]>([
        { id: uuidv4(), text: "go to the market", isDone: false },
        { id: uuidv4(), text: "water the plants", isDone: false },
        { id: uuidv4(), text: "read a book", isDone: false },
    ]);
    const [newTodoText, setNewTodoText] = useState<string>("");

    const addTodo = (text: string) => {
        const newItems = [...todoItems, { id: uuidv4(), text, isDone: false }];
        setTodoItems(newItems);
    }

    const deleteTodo = (id: string) => {
        let newItems: TodoType[] = [];
        for (let item of todoItems) {
            if (item.id !== id) {
                newItems.push({ ...item });
            }
        }
        setTodoItems(newItems);
    }

    const toggleIsDone = (id: string) => {
        let newItems = todoItems.map((item) => {
            let o = { ...item };
            if (o.id === id) {
                o.isDone = !o.isDone;
            }
            return o;
        });
        setTodoItems(newItems);
    }

    const handleAddTodo = () => {
        if (newTodoText.trim().length > 0) {
            addTodo(newTodoText);
            setNewTodoText("");
        }
    }

    const handleDeleteTodo = (id: string) => {
        if (id.trim().length > 0) {
            deleteTodo(id);
        }
    }

    const handleToggleIsDone = (id: string) => {
        if (id.trim().length > 0) {
            toggleIsDone(id);
        }
    }

    return (
        <>
            <Head>
                <title>To-Do List</title>
            </Head>
            <div className="max-w-sm bg-slate-50 rounded-md shadow p-4 text-zinc-700 min-h-350">
                <h2 className="font-semibold">To-Do List</h2>
                <div className="border-b-2 border-zinc-300 p-2 flex">
                    <input type="text" value={newTodoText} placeholder="Enter to-do...." className="rounded"
                        onChange={(e) => setNewTodoText(e.target.value)}></input>
                    <button onClick={handleAddTodo} title="Add to-do" className="bg-sky-600 rounded text-white px-2 ml-4">Add</button>
                </div>
                <div>
                    <ul className="flex flex-col">
                        {todoItems.map((item) => (
                            <li key={item.id} className="flex justify-between items-center py-2 border-b border-zinc-300">
                                <label>
                                    <input type="checkbox" className="" checked={item.isDone} onChange={(e) => handleToggleIsDone(item.id)}></input>
                                    <span className={`px-4 ${item.isDone && "text-decoration-line: line-through"}`}>{item.text}</span>
                                </label>
                                <span className="px-4 items-center">
                                    <button title="Delete to-do" className="bg-zinc-600 text-white rounded-lg p-1" onClick={(e) => handleDeleteTodo(item.id)}>
                                        <span><FiTrash2 /></span>
                                    </button>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Todos
