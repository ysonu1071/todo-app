import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import Header from '../components/header'
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = () => {
        if (!name || !email || !password) {
            alert("please fill all field");
            return;
        }

        fetch("http://localhost:8000/user/register", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if(response.status=== "success"){
                toast.success(response.message);
            }else{
                toast.error(response.message);
            }
        }).catch((error) => {
            console.log(error.message);
        })

        setName("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className='w-screen h-[100vh] flex flex-col items-center'>
            <div><Toaster
                position="top-center"
                reverseOrder={false}
            /></div>
            <Header />
            <div className='w-[90%] lg:w-[500px] bg-gray-100 h-[400px] flex flex-col items-center rounded shadow shadow-gray-400 p-4 mt-8'>
                <h1 className='text-2xl lg:text-3xl font-bold text-center'>Register</h1>
                <div className='w-full lg:w-[70%]'>
                    <div className='w-full mb-2'>
                        <label htmlFor="name">Name:</label><br />
                        <input type="text" value={name} className='w-full rounded outline-none focus:border focus:border-gray-400 p-2' id='name' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='w-full mb-2'>
                        <label htmlFor="email">Email:</label><br />
                        <input type="email" id='email' value={email} className='w-full rounded outline-none focus:border focus:border-gray-400 p-2' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='w-full mb-2'>
                        <label htmlFor="password">Password:</label><br />
                        <input type="password" id='password' value={password} className='w-full rounded outline-none focus:border focus:border-gray-400 p-2' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='w-full flex justify-end mt-8'>
                        <button className='px-4 py-2 rounded bg-blue-400 text-white cursor-pointer' onClick={handleRegister}>Register</button>

                    </div>
                    <p className='mt-4 text-sm'>Already have an account? <span className='text-blue-400 cursor-pointer' onClick={()=> navigate("/login")}>Login</span></p>
                </div>
            </div>
        </div>
    )
}

export default Register