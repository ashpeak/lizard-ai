import { useState } from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import { MdOutlineClose } from "react-icons/md";
import { createProject } from '../../lib/project';
import { toast } from 'sonner';


// eslint-disable-next-line react/prop-types
export default function NewProject({ handleClose }) {
    const [projectData, setProjectData] = useState({
        name: '',
        idea: '',
        template: 'empty',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.promise(
            createProject(projectData),
            {
                loading: 'Wait creating project...',
                success: 'Project created successfully.',
                error: () => {
                    return "Error while creating project";
                },
                duration: 6000
            }
        );
    }

    return (
        <Backdrop onClick={handleClose} position={"items-center"}>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className='w-[21rem] h-[21rem] md:w-96 md:h-96 bg-secondary-light dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl flex flex-col items-center'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='w-full'>
                    <div className='flex items-center justify-between'>
                        <p className=' flex items-center gap-1 rounded-ss-xl opacity-100 px-4 py-2'>New File</p>
                        <button onClick={handleClose} className='mr-4 flex items-center gap-1 rounded-full opacity-100 p-1 hover:bg-neutral-300 transition-colors duration-200 cursor-pointer hover:dark:bg-neutral-700'>
                            <MdOutlineClose size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-4 w-full p-2'>
                            <input type="text"
                                onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                                placeholder="Project name"
                                required
                                className="appearance-none bg-neutral-50 dark:bg-neutral-700 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={projectData.name} />

                            {projectData.template !== 'empty' && (
                                <textarea placeholder="Project idea" required value={projectData.idea}
                                    onChange={(e) => setProjectData({ ...projectData, idea: e.target.value })}
                                />)}

                            <div className="relative flex">
                                <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                                    <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.592 0 35.355l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" />
                                </svg>
                                <select
                                    className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                    required
                                    value={projectData.template}
                                    onChange={(e) => setProjectData({ ...projectData, template: e.target.value })}
                                >
                                    <option value="empty">Empty</option>
                                    <option value="idea">Idea to Video</option>
                                    <option value="tweet">Tweet to Video</option>
                                    {/* Add more options as needed */}
                                </select>
                            </div>

                            <button type='submit'>Create</button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </Backdrop>
    )
}
