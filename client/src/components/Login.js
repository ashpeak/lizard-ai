import React, { useState } from 'react'
import userAuth from '../lib/userAuth';
import { Toaster, toast } from 'sonner';

export default function Login() {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (type) => {
        toast.promise(
            type === 'register' ? userAuth.register(user.username, user.password) : userAuth.login(user.username, user.password),
            {
                loading: type === 'register' ? 'Registering...' : 'Logging in...',
                success: type === 'register' ? 'Registered successfully!' : 'Logged in successfully!',
                error: (err) => {
                    return "Something went wrong";
                }
            }
        );
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='bg-white rounded-lg shadow-2xl shadow-rose-200 w-1/3'>
                <h2>Login</h2>
                <div className='w-full p-4'>
                    <input className='w-full dark:text-text-light text-text-dark border-2 border-gray-400 p-4 rounded-lg mb-4' onChange={handleChange} type='text' name='username' placeholder='Username' />
                    <input className='w-full dark:text-text-light text-text-dark border-2 border-gray-400 p-4 rounded-lg mb-4' onChange={handleChange} type='password' name='password' placeholder='Password' />
                    <div className='my-4'>
                        <button type='button' onClick={() => handleSubmit("login")} className='w-full bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-700'>Login</button>
                    </div>
                    <div className='my-4'>
                        <button type='button' onClick={() => handleSubmit("register")} className='w-full bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-700'>Login</button>
                    </div>
                </div>
            </div>

            <Toaster richColors position="bottom-right" />
        </div>
    )
}
