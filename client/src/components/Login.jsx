import { useState } from 'react'
import userAuth from '../lib/userAuth';
import { Toaster, toast } from 'sonner';
import { useGoogleLogin } from '@react-oauth/google';
import { auth } from '../states/useAuth';
import { motion } from 'framer-motion';

export default function Login() {

    const { checkAuth } = auth();
    const [email, setEmail] = useState('');

    const handleSubmit = async (method, access_token) => {
        toast.promise(
            method === "email" ? userAuth.sendEmail(email) : userAuth.login(null, method, access_token),
            {
                loading: (method === "email" ? "Sending email..." : "Logging in..."),
                success: (data) => {
                    checkAuth();
                    setEmail('');
                    return data;
                },
                error: (err) => {
                    return err || "Something went wrong";
                }
            }
        );
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            handleSubmit("google", codeResponse.access_token);
        },
        onError: errorResponse => toast.error(errorResponse.details[0].message),
    });

    return (
        <div className="flex relative justify-center items-center h-[85vh]">

            {/* Ambient backdrop */}
            <div className='absolute blur-2xl left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
                <div className='flex translate-y-28 md:translate-y-32'>
                    <div className='w-40 h-40 md:w-[20rem] md:h-[20rem] md:-mr-2 circle_blue rounded-3xl'></div>
                    <div className='w-40 h-40 md:w-[20rem] md:h-[20rem] md:-ml-2 circle_red rounded-3xl'></div>
                </div>
                <div className='w-[20rem] h-[20rem] circle_yellow rounded-3xl' style={{ transform: 'translate(-12rem, 7rem)' }}></div>
            </div>

            <div className="p-8 z-10 w-full md:w-[26rem] text-text-light dark:text-text-dark bg-secondary-light dark:bg-secondary-dark rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login Form</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit("email") }}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="name">
                            Email
                        </label>
                        <input
                            className="appearance-none bg-neutral-50 dark:bg-neutral-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="email"
                            required
                            name="name"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email address"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-rose-500 hover:bg-rose-600 transition-colors duration-150 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </motion.button>
                </form>

                {/* Divider */}
                <div className="my-4 flex items-center gap-2">
                    <hr className="w-full opacity-85" />
                    <span className="text-base font-bold text-neutral-500 dark:text-neutral-400">OR</span>
                    <hr className="w-full opacity-85" />
                </div>

                {/* Google login */}
                <div className="mt-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={googleLogin}
                        className="bg-white w-full opacity-85 hover:opacity-100 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >
                        <div className="flex items-center gap-2">
                            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" />
                            <span>Sign in with Google</span>
                        </div>
                    </motion.button>
                </div>
            </div>
            <Toaster richColors position='bottom-right' />
        </div>
    )
}
