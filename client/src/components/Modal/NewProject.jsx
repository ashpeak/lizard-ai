import { useState } from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import { MdOutlineClose } from "react-icons/md";

// eslint-disable-next-line react/prop-types
export default function NewProject({ handleClose, handleSubmit }) {
    const [projectData, setProjectData] = useState({
        name: '',
        idea: '',
        template: 'empty',
    });

    return (
        <Backdrop onClick={handleClose} position={"items-center"}>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className='w-[21rem] h-[23rem] relative md:w-96 md:h-96 bg-secondary-light dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl flex flex-col items-center'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='w-full'>
                    <div className='flex items-center justify-between border-b border-border-light dark:border-border-dark'>
                        <p className=' flex items-center gap-1 rounded-ss-xl opacity-100 px-4 py-2'>New File</p>
                        <button onClick={handleClose} className='mr-4 flex items-center gap-1 rounded-full opacity-100 p-1 hover:bg-neutral-300 transition-colors duration-200 cursor-pointer hover:dark:bg-neutral-700'>
                            <MdOutlineClose size={20} />
                        </button>
                    </div>

                    <form onSubmit={(e) => handleSubmit(e, projectData)}>
                        <div className='flex flex-col gap-4 w-full p-2 mt-2'>
                            <input type="text"
                                onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                                placeholder="Project name"
                                required
                                className="appearance-none bg-neutral-50 dark:bg-neutral-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={projectData.name} />

                            {projectData.template !== 'empty' && (
                                <textarea placeholder="Project idea"
                                    required
                                    rows={3}
                                    maxLength={300}
                                    value={projectData.idea}
                                    onChange={(e) => setProjectData({ ...projectData, idea: e.target.value })}
                                    className="appearance-none bg-neutral-50 dark:bg-neutral-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                />)}

                            <div className='flex flex-wrap gap-4 items-center'>
                                <div className='flex flex-col'>
                                    <label htmlFor='template' className='text-base mb-1 font-medium text-neutral-500 dark:text-neutral-400'>Template</label>
                                    <div className="relative inline-flex w-fit">
                                        <svg className="w-3 h-3 absolute top-0 right-0 mx-4 mt-[0.8rem] pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                                            <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.592 0 35.355l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" />
                                        </svg>
                                        <select
                                            className="border border-gray-400 cursor-pointer rounded-full h-10 pl-5 bg-neutral-50 dark:bg-neutral-700 hover:border-gray-300 focus:outline-none appearance-none"
                                            required
                                            id='template'
                                            value={projectData.template}
                                            onChange={(e) => setProjectData({ ...projectData, template: e.target.value })}
                                        >
                                            <option className='cursor-pointer bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 hover:dark:bg-neutral-700 transition-colors duration-150 opacity-70 hover:opacity-95' value="empty">Empty</option>
                                            <option className='cursor-pointer bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 hover:dark:bg-neutral-700 transition-colors duration-150 opacity-70 hover:opacity-95' value="idea">Idea to Video</option>
                                            <option className='cursor-pointer bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 hover:dark:bg-neutral-700 transition-colors duration-150 opacity-70 hover:opacity-95' value="tweet">Tweet to Video</option>
                                            {/* Add more options as needed */}
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='language' className='text-base mb-1 font-medium text-neutral-500 dark:text-neutral-400'>Language</label>
                                    <div className="relative inline-flex w-fit">
                                        <svg className="w-3 h-3 absolute top-0 right-0 mx-4 mt-[0.8rem] pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                                            <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.592 0 35.355l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" />
                                        </svg>
                                        <select
                                            className="border border-gray-400 cursor-pointer rounded-full pr-10 h-10 pl-5 bg-neutral-50 dark:bg-neutral-700 hover:border-gray-300 focus:outline-none appearance-none"
                                            required
                                            id='language'
                                        >
                                            <option className='cursor-pointer bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 hover:dark:bg-neutral-700 transition-colors duration-150 opacity-70 hover:opacity-95' value="english">English</option>
                                            {/* Add more options as needed */}
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='ratio' className='text-base mb-1 font-medium text-neutral-500 dark:text-neutral-400'>Aspect ratio</label>
                                    <div className="relative inline-flex w-fit">
                                        <svg className="w-3 h-3 absolute top-0 right-0 mx-4 mt-[0.8rem] pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                                            <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.592 0 35.355l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" />
                                        </svg>
                                        <select
                                            className="border border-gray-400 cursor-pointer rounded-full pr-10 h-10 pl-5 bg-neutral-50 dark:bg-neutral-700 hover:border-gray-300 focus:outline-none appearance-none"
                                            required
                                            id='ratio'
                                        >
                                            <option className='cursor-pointer bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 hover:dark:bg-neutral-700 transition-colors duration-150 opacity-70 hover:opacity-95' value="english">Portrait (9:16)</option>
                                            {/* Add more options as needed */}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex justify-center'>
                                <button type='submit' className='flex justify-center gap-2 mt-6 w-full items-center px-3 py-2 rounded-3xl bg-rose-500 text-white hover:bg-rose-600 transition-all duration-200'>
                                    <p>Create</p>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </Backdrop>
    )
}
