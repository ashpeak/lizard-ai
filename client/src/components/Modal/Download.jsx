// import { useState } from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import { MdOutlineClose } from "react-icons/md";
import { BiSolidDownload } from 'react-icons/bi';
import { format } from 'date-fns';
import { FaArrowRight } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
export default function Download({ handleClose, exported, createdAt, generate, download }) {

    return (
        <Backdrop onClick={handleClose} position={"items-center"}>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className='w-[21rem] h-fit pb-3 relative md:w-96 bg-secondary-light dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl flex flex-col items-center'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='w-full'>
                    <div className='flex items-center justify-between border-b border-border-light dark:border-border-dark'>
                        <p className=' flex items-center gap-1 rounded-ss-xl opacity-100 px-4 py-2'>Download</p>
                        <button onClick={handleClose} className='mr-4 flex items-center gap-1 rounded-full opacity-100 p-1 hover:bg-neutral-300 transition-colors duration-200 cursor-pointer hover:dark:bg-neutral-700'>
                            <MdOutlineClose size={20} />
                        </button>
                    </div>
                    <div className='flex flex-col gap-4 w-full p-2 mt-2'>
                        <div className='flex flex-wrap gap-4 items-center'>
                            {exported ? (
                                <div className='w-full gap-y-2 flex flex-col items-center justify-center'>
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} onClick={download} type='button' className='w-fit px-3 flex justify-center gap-2 mt-6 items-center py-[0.3rem] rounded-3xl bg-rose-500 text-white hover:bg-rose-600'>
                                        <BiSolidDownload size={20} />
                                        <p>Download file</p>
                                    </motion.button>
                                    <p className='text-text-light mt-3 text-xs px-4 text-start dark:text-text-dark opacity-70'>Created on {format(new Date(createdAt), 'MMM dd, hh:mm a')}</p>
                                    <p className='text-text-light text-xs px-4 text-start dark:text-text-dark opacity-70'>Note: Credits will not be charged for failed exports</p>
                                </div>
                            ) : (
                                <div className='w-full gap-3 flex-col items-start flex justify-center'>
                                    <p className='text-text-light px-4 text-start dark:text-text-dark opacity-80'>No previous export was found. You can start new export to download the file.</p>
                                    <p className='text-text-light text-xs px-4 text-start dark:text-text-dark opacity-70'>Note: Credits will not be charged for failed exports</p>
                                </div>
                            )}
                        </div>

                        <div className='w-full flex justify-center'>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                type='button'
                                onClick={generate}
                                className='w-fit px-4 flex justify-center gap-2 mt-6 items-center py-[0.3rem] rounded-3xl border border-neutral-500 dark:border-neutral-600 hover:bg-neutral-300 hover:dark:bg-neutral-700'>
                                <p>{exported ? "Export again" : "Start export"}</p>
                                <FaArrowRight size={17} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    )
}