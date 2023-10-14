import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Todos from '../components/Todos'
import toast, { Toaster } from 'react-hot-toast';
import DeleteTodoModal from '../components/DeleteTodoModal'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAllTodos, setIsLogedIn, setUserName } from '../redux/slices/todoDataSlice';

function Home() {
  const [todo, setTodo] = useState("");
  const [deletingTodo, setDeletingTodo] = useState('');
  const [showTodos, setShowTodos] = useState(true);
  const [showCompletedTodos, setShowCompletedTodos] = useState(false);
  const [showDelteBox, setShowDeleteBox] = useState(false);
  const [filterdTodo, setFilterdTodo] = useState([]);

  const { isLogedIn, allTodos } = useSelector((state) => state.todos);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    let text = todo.trim();
    if (text === "") {
      alert("Please write somethig in todo box");
      return;
    }

    fetch("http://localhost:8000/todo/add", {
      method: "POST",
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: text })
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.status === 'success') {
        let temp = [...allTodos, response.data];
        dispatch(setAllTodos(temp));
        toast.success(response.message);
      } else {
        console.log(response.message);
        toast.error("Could not add todo!");
      }
    }).catch((error) => {
      console.log(error.message);
      toast.error(error.message);
    })

    setTodo("");
  }

  const handleFilterdTodo = () => {
    let temp;
    if (showTodos) {
      temp = allTodos.filter((todo) => todo.completed === false)
    } else {
      temp = allTodos.filter((todo) => todo.completed === true)
    }
    setFilterdTodo(temp);
  }

  const handleShowTodo = () => {
    setShowTodos(true);
    setShowCompletedTodos(false)
  }

  const handleCompltedTodo = () => {
    setShowTodos(false);
    setShowCompletedTodos(true)
  }

  const fetchAllTodo = () => {
    fetch("http://localhost:8000/todo/", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.status === 'fail') {
        if (response.message === "Token is not found!" || response.message === "Wrong token found!") {
          navigate("/login");
        } else {
          toast.error(response.message);
        }
      } else {
        dispatch(setAllTodos(response.data));
        dispatch(setUserName(response.userName));
        dispatch(setIsLogedIn(true));
      }
    }).catch((error) => {
      console.log(error.message);
    })
  }

  const handleDeleteBox = (todo, show) => {
    if (show) {
      setShowDeleteBox(true);
      setDeletingTodo(todo);
    } else {
      setShowDeleteBox(false);
      setDeletingTodo("");
    }
  }

  useEffect(() => {
    fetchAllTodo();
  }, [isLogedIn]);

  useEffect(() => {
    handleFilterdTodo();
  }, [showTodos, showCompletedTodos, allTodos])

  return (
    <div className='relative'>
      <div><Toaster
        position="top-center"
        reverseOrder={false}
      /></div>
      <Header />
      <div className='w-full flex justify-center'>
        <div className='w-[95%] lg:w-[70%] min-h-[300px] mt-8 border border-gray-400'>
          <div className='w-full h-[80px] lg:h-[150px] flex justify-center items-center bg-gray-200'>
            <input type="text" className='w-[70%] lg:w-[50%] p-1 lg:p-2 shadow shadow-gray-200 focus:border focus:border-gray-400 outline-none rounded-tl rounded-bl' value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button className='px-2 py-[6px] text-sm lg:text-lg lg:px-4 bg-blue-400 rounded-tr rounded-br' onClick={handleAddTodo}>ADD TODO</button>
          </div>

          <div className='w-full flex justify-center gap-6 mt-10'>
            <button className={'px-4 py-2 ' + (showTodos ? 'border-b-2 border-blue-400' : "")} onClick={handleShowTodo}>Todos</button>
            <button className={'px-4 py-2 ' + (showCompletedTodos ? 'border-b-2 border-blue-400' : "")} onClick={handleCompltedTodo}>Completed Todos</button>
          </div>

          {filterdTodo.length == 0 ? showCompletedTodos ? <p className='w-full text-center text-xl text-gray-500/50 mt-6'>You don't have any completed Todo yet.</p>: <p className='w-full text-center text-xl text-gray-500/50 mt-6'>You don't have any Todo yet.</p> : filterdTodo.map((todo) => <Todos key={todo._id} todo={todo} showTodos={showTodos} handleDeleteBox={handleDeleteBox} />)}


        </div>
      </div>

      {showDelteBox && <DeleteTodoModal todo={deletingTodo} handleDeleteBox={handleDeleteBox} />}

    </div>
  )
}

export default Home