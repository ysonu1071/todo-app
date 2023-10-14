import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLogedIn } from '../redux/slices/todoDataSlice';
import { useNavigate } from 'react-router-dom';

function Header() {

  const { isLogedIn, userName } = useSelector((state) => state.todos)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if(localStorage.getItem('token')){
      localStorage.removeItem("token");
      dispatch(setIsLogedIn(false));
      navigate("/login");
    }
  }


return (
  <div className='w-full h-[70px] bg-blue-400 flex items-center justify-between px-2 lg:px-8'>
    <p className='text-2xl'>Todo<span className='text-white'>app</span></p>
    <div className='flex gap-4 items-center'>
      {isLogedIn && <p className='text-xl w-[100px] truncate lg:w-auto'>{userName}</p>}
      {isLogedIn && <button className='px-2 lg:px-4 lg:py-2 bg-red-400 rounded-md' onClick={handleLogout}>Logout</button>}
    </div>
  </div>
)
}

export default Header