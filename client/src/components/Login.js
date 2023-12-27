import React, { useState } from 'react'
import userAuth from '../lib/userAuth';
import { Toaster, toast } from 'sonner';
import { useGoogleLogin } from '@react-oauth/google';
import { auth } from '../states/useAuth';

export default function Login() {

    const { checkAuth } = auth();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (type, method, access_token = null) => {
        toast.promise(
            type === 'register' ? userAuth.register(user.username, user.password) : userAuth.login(user, method, access_token),
            {
                loading: type === 'register' ? 'Registering...' : 'Logging in...',
                success: type === 'register' ? 'Registered successfully!' : 'Logged in successfully!',
                error: (err) => {
                    return "Something went wrong";
                }
            }
        );
        checkAuth();
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }


    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            handleSubmit("login", "google", codeResponse.access_token);
        },
        onError: errorResponse => toast.error(errorResponse.details[0].message),
    });

    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <div className='bg-white rounded-lg shadow-2xl shadow-rose-200 w-1/3'>
                <h2>Login</h2>
                <div className='w-full p-4'>
                    <input className='w-full dark:text-text-light text-text-dark border-2 border-gray-400 p-4 rounded-lg mb-4' onChange={handleChange} type='text' name='username' placeholder='Username' />
                    <input className='w-full dark:text-text-light text-text-dark border-2 border-gray-400 p-4 rounded-lg mb-4' onChange={handleChange} type='password' name='password' placeholder='Password' />
                    <div className='my-4'>
                        <button type='button' onClick={() => googleLogin()} className='w-full bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-700'>Login</button>
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
