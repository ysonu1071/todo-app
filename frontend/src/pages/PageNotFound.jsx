import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='mt-[100px] flex flex-col items-center'>
        <p className='text-4xl text-gray-400'>Page Not Found!</p>
        <p className='text-blue-500 mt-4 cursor-pointer' onClick={()=>navigate("/")}>Go to home page</p>
      </div>
    </div>
  )
}

export default PageNotFound