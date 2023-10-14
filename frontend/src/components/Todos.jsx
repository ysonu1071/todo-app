import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTodos } from '../redux/slices/todoDataSlice';


function Todos({ todo, showTodos, handleDeleteBox }) {

    const [showEditBox, setShowEditBox] = useState(false);
    const [id, setId] = useState("");
    const [updateText, setUpdateText] = useState(todo.todo);
    const { allTodos } = useSelector((state) => state.todos)

    const dispatch = useDispatch();

    const handleComplete = (id) => {
        fetch("http://localhost:8000/todo/complete", {
        // fetch("https://todo-app-backend-pqy0.onrender.com/todo/complete", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, completed: true })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response.message);

        }).catch((error) => {
            console.log(error.message);
        });

        let temp = JSON.parse(JSON.stringify([...allTodos]));
        let arr = [];

        for (let todo of temp) {
            if (todo._id === id) {
                todo["completed"] = true;
            }
            arr.push(todo);
        }
        dispatch(setAllTodos(arr));
    }

    const handleUncomplete = (id) => {
        fetch("http://localhost:8000/todo/complete", {
        // fetch("https://todo-app-backend-pqy0.onrender.com/todo/complete", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, completed: false })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response.message);

        }).catch((error) => {
            console.log(error.message);
        });

        let temp = JSON.parse(JSON.stringify([...allTodos]));
        let arr = [];

        for (let todo of temp) {
            if (todo._id === id) {
                todo["completed"] = false;
            }
            arr.push(todo);
        }
        dispatch(setAllTodos(arr));
    }


    const handleUpdate = (id) => {
        let text = updateText.trim();
        if(text === ''){
            alert("please write something in todo");
            return;
        }

        fetch("http://localhost:8000/todo/update", {
        // fetch("https://todo-app-backend-pqy0.onrender.com/todo/update", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, todo:updateText })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response.message);

        }).catch((error) => {
            console.log(error.message);
        });

        let temp = JSON.parse(JSON.stringify([...allTodos]));
        let arr = [];

        for (let todo of temp) {
            if (todo._id === id) {
                todo["todo"] = updateText;
            }
            arr.push(todo);
        }
        dispatch(setAllTodos(arr));
        setShowEditBox(false);
    }

    return (
        <div className='w-full md:p-4 flex flex-col md:flex-row relative bg-gray-200 md:bg-white mt-2'>
            <div className='w-full px-2 md:px-0 md:w-[70%] text-center md:text-left'>{todo.todo}</div>
            <div className='w-full md:w-[30%] mt-2 py-1 md:py-0 md:mt-0 flex gap-4 justify-center items-center bg-gray-300 md:bg-white'>
                <div className='cursor-pointer' onClick={() => setShowEditBox(true)}><EditIcon/></div>
                <div className='cursor-pointer' onClick={()=> handleDeleteBox(todo, true)}><DeleteIcon /></div>
                <div className='px-2 py-1 md:px-4 md:py-2 bg-blue-400 rounded-md'>{showTodos ? <button onClick={() => handleComplete(todo._id)}>Complete</button> : <button onClick={() => handleUncomplete(todo._id)}>Uncomplete</button>}</div>
            </div>

            {showEditBox && <div className='h-full w-full z-20 absolute top-0 left-0 bg-gray-200 flex justify-between items-center px-4'>
                <input type="text" className='w-[70%] p-2 h-10 rounded focus:border focus:border-gray-400 outline-none' value={updateText} onChange={(e)=> setUpdateText(e.target.value)}/>
                <div className='w-[30%] flex justify-center gap-3 md:gap-6'>
                    <div className='cursor-pointer' onClick={()=> handleUpdate(todo._id)}><CheckIcon /></div>
                    <div className='cursor-pointer'> <CloseIcon onClick={() => setShowEditBox(false)} /></div>
                </div>
            </div>}

        </div>
    )
}

export default Todos