import { useState } from 'react'
import userAuth from '../lib/userAuth';
import { Toaster, toast } from 'sonner';
import { useGoogleLogin } from '@react-oauth/google';
import { auth } from '../states/useAuth';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

    const { checkAuth } = auth();
    const [user, setUser] = useState({
        email: '',
        fName: '',
        lName: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (method, access_token) => {
        toast.promise(
            method === "email" ? userAuth.signup(user) : userAuth.login(null, method, access_token),
            {
                loading: (method === "email" ? "Signing up..." : "Logging in..."),
                success: (data) => {
                    checkAuth();
                    setUser({
                        email: '',
                        fName: '',
                        lName: '',
                    });
                    navigate('/login');
                    return data;
                },
                error: (err) => {
                    return err || "Something went wrong";
                }
            }
        );
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
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
                <div className='flex translate-y-6 md:translate-y-20'>
                    <div className='w-40 h-40 md:w-[20rem] md:h-[20rem] md:-mr-2 circle_blue rounded-3xl'></div>
                    <div className='w-40 h-40 md:w-[20rem] md:h-[20rem] md:-ml-2 circle_red rounded-3xl'></div>
                </div>
                <div className='w-[20rem] h-[20rem] circle_yellow rounded-3xl' style={{ transform: 'translate(-12rem, 7rem)' }}></div>
            </div>

            <div className="p-8 z-10 w-full md:w-[26rem] text-text-light dark:text-text-dark bg-secondary-light dark:bg-secondary-dark rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Signup Form</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit("email") }}>
                    <div className="mb-4 flex gap-3 flex-col">
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="appearance-none bg-neutral-50 dark:bg-neutral-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                required
                                name="email"
                                onChange={handleChange}
                                value={user.email}
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="fName">
                                First Name
                            </label>
                            <input
                                className="appearance-none bg-neutral-50 dark:bg-neutral-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="fName"
                                type="text"
                                required
                                name="fName"
                                onChange={handleChange}
                                value={user.fName}
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="lName">
                                Last Name
                            </label>
                            <input
                                className="appearance-none bg-neutral-50 dark:bg-neutral-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="lName"
                                type="text"
                                required
                                name="lName"
                                onChange={handleChange}
                                value={user.lName}
                                placeholder="Last Name"
                            />
                        </div>
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

                <div className="mt-4 text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Already have an account ?</span>
                    <Link to="/login" className="text-rose-500 hover:text-rose-600 transition-colors duration-150 font-bold"> Log in</Link>
                </div>

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
                            <span>Signup with Google</span>
                        </div>
                    </motion.button>
                </div>
            </div>
            <Toaster richColors position='bottom-right' />
        </div>
    )
}
