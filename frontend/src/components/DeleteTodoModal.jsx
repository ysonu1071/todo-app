import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAllTodos } from '../redux/slices/todoDataSlice';

function DeleteTodoModal({ todo, handleDeleteBox }) {
  const {allTodos} = useSelector((state)=> state.todos);

  const dispatch = useDispatch();

  const handleDeleteTodo = () => {
    fetch("http://localhost:8000/todo/delete", {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo._id })
    }).then((response) => {
      return response.json();
    }).then((response) => {
      console.log(response.message);

    }).catch((error) => {
      console.log(error.message);
    });

    let temp = JSON.parse(JSON.stringify([...allTodos]));
    let arr = temp.filter((data)=> data._id != todo._id);
    dispatch(setAllTodos(arr));

    handleDeleteBox("", false);
  }

  return (
    <div className='w-full h-[100vh] fixed bg-blue-400/70 top-0 left-0 flex justify-center items-center'>
      <div className='w-[90%] md:w-[400px] h-[300px] bg-white shadow-md shadow-gray-200 p-4 rounded-md'>
        <div className='text-2xl font-bold py-2'><span className='text-red-400 '>Deleting</span> Todo</div>
        <div className='py-2 h-[150px] overflow-auto'>
          {todo.todo}
        </div>
        <div className='w-full flex justify-end gap-6 mt-6'>
          <button className='px-4 py-2 rounded-md shadow-md shadow-gray-300' onClick={() => handleDeleteBox("", false)}>Cancle</button>
          <button className='px-4 py-2 rounded-md bg-red-400' onClick={handleDeleteTodo}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteTodoModal