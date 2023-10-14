import React, {useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import {setIsLogedIn, setUserName} from "../redux/slices/todoDataSlice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = () => {
        if (!email || !password) {
            alert("please fill all field");
            return;
        }

        fetch("http://localhost:8000/user/login", {
        // fetch("https://todo-app-backend-pqy0.onrender.com/user/login", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if(response.status=== "success"){
                console.log(response.message);
                dispatch(setIsLogedIn(true));
                dispatch(setUserName(response.data.name));
                localStorage.setItem("token", response.token);
                navigate("/");
            }else{
                toast.error(response.message);
            }
        }).catch((error) => {
            console.log(error.message);
        })

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
            <div className='w-[90%] lg:w-[500px] bg-gray-100 h-[320px] flex flex-col items-center rounded shadow shadow-gray-400 p-4 mt-8'>
                <h1 className='text-2xl lg:text-3xl font-bold text-center'>Login</h1>
                <div className=' w-full lg:w-[70%]'>
                    <div className='w-full mb-2'>
                        <label htmlFor="email">Email:</label><br />
                        <input type="email" id='email' value={email} className='w-full rounded outline-none focus:border focus:border-gray-400 p-2' placeholder='Enter your email' onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                    <div className='w-full mb-2'>
                        <label htmlFor="password">Password:</label><br />
                        <input type="password" id='password' value={password} className='w-full rounded outline-none focus:border focus:border-gray-400 p-2' placeholder='Enter your password' onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <div className='w-full flex justify-end mt-8'>
                        <button className='px-4 py-2 rounded bg-blue-400 text-white cursor-pointer' onClick={handleLogin}>Login</button>

                    </div>
                    <p className='mt-4 text-sm'>Dont't have an account? <span className='text-blue-400 cursor-pointer' onClick={()=> navigate("/register")}>Register</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login