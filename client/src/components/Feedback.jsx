import React, { useState } from 'react';
import { FaRegGrinHearts } from "react-icons/fa";
import { FaRegFaceSmile, FaRegFaceMeh } from "react-icons/fa6";
import { motion } from "framer-motion";
import { toast } from 'sonner';
import { misc } from '../lib/misc';

const Feedback = () => {

    const [rating, setRating] = useState({
        feeling: "loved",
        name: "",
        message: ""
    });

    const handleChange = (e) => {
        setRating({
            ...rating,
            [e.target.name]: e.target.value
        });
    }

    const handleFeeling = (feeling) => {
        setRating({
            ...rating,
            feeling
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating.name === "" || rating.message === "") {
            toast.error("Please fill all the fields");
            return;
        }

        toast.promise(misc.sendFeedback(rating), {
            loading: 'Sending feedback...',
            success: () => {
                setRating({
                    feeling: "loved",
                    name: "",
                    message: ""
                });
                return 'Feedback sent successfully';
            },
            error: 'Error sending feedback'
        }, { duration: 3000 });
    }

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
                <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="appearance-none bg-neutral-50 dark:bg-neutral-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            required
                            minLength={4}
                            name="name"
                            onChange={handleChange}
                            value={rating.name}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="appearance-none rounded w-full py-2 px-3 bg-neutral-50 dark:bg-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            required
                            minLength={10}
                            rows="4"
                            name="message"
                            onChange={handleChange}
                            value={rating.message}
                            placeholder="Enter your message"
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="rating">
                            Rating
                        </label>
                        <div className="flex items-center justify-around">
                            <motion.button type='button' whileHover={{ scale: 1.2 }} onClick={() => handleFeeling("average")} className={(rating.feeling === "average" ? "shadow-feeling shadow-amber-500" : "") + " bg-neutral-50 dark:bg-neutral-700 p-2 rounded-full focus:outline-none focus:shadow-outline"}>
                                <FaRegFaceMeh size={24} color='#f59e0b' />
                            </motion.button>
                            <motion.button type='button' whileHover={{ scale: 1.2 }} onClick={() => handleFeeling("good")} className={(rating.feeling === "good" ? "shadow-feeling shadow-green-500" : "") + " bg-neutral-50 dark:bg-neutral-700 p-2 rounded-full focus:outline-none focus:shadow-outline"}>
                                <FaRegFaceSmile size={24} color='#22c55e' />
                            </motion.button>
                            <motion.button type='button' whileHover={{ scale: 1.2 }} onClick={() => handleFeeling("loved")} className={(rating.feeling === "loved" ? "shadow-feeling shadow-rose-500" : "") + " bg-neutral-50 dark:bg-neutral-700 p-2 rounded-full focus:outline-none focus:shadow-outline"}>
                                <FaRegGrinHearts size={24} color='#f43f5e' />
                            </motion.button>
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
            </div>
        </div>
    );
};

export default Feedback;
