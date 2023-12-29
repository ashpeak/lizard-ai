import { useState } from 'react'
import { getAllProjects } from '../lib/project';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaFileMedical } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { format } from 'date-fns';
import NewProject from './Modal/NewProject';
import { createProject } from '/src/lib/project';
import { toast } from 'sonner';

export default function Files() {
    const [modal, setModal] = useState(false);

    const { data, isLoading, refetch } = useQuery({ queryKey: ['projects'], queryFn: getAllProjects, refetchOnWindowFocus: false });

    const handleSubmit = async (e, projectData) => {
        e.preventDefault();
        toast.promise(
            createProject(projectData),
            {
                loading: 'Wait creating project...',
                success: (data) => {
                    refetch();
                    setModal(false);
                    return data.message;
                },
                error: () => {
                    return "Error while creating project";
                },
                duration: 3000
            }
        );
    }

    return (
        <div className='-mt-4'>
            <div className='flex justify-center'>
                <div className='w-full flex md:flex-row justify-between px-6 rounded-xl py-3 bg-secondary-light dark:bg-secondary-dark'>
                    <div className='flex gap-2 items-center'>
                        <h2>Home</h2>
                    </div>
                    <div className='flex gap-2'>
                        <button type='button' onClick={() => setModal(true)} className='flex gap-2 items-center px-3 py-1 rounded-2xl bg-rose-500 text-white hover:bg-rose-600 transition-all duration-200'>
                            <FaFileMedical size={17} />
                            <p>Ai create</p>
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div className='mt-1 flex items-center justify-between px-6 py-2 border-b dark:border-border-dark border-border-light'>
                    <div className='flex items-center gap-x-6 md:gap-x-14'>
                        <h2 className='font-semibold opacity-90'>COVER</h2>
                        <h2 className='font-semibold opacity-90'>NAME</h2>
                    </div>
                    <h2 className='font-semibold opacity-90 hidden md:block'>MODIFIED</h2>
                </div>
                <div className='flex flex-col mt-3'>
                    {isLoading && <p>Loading...</p>}
                    {(Array.isArray(data) && data?.length > 0) && data.map((project, index) => (
                        <div key={index}>
                            <Link className='flex flex-row gap-4 mx-2 px-4 py-3 items-center justify-between hover:opacity-95 hover:dark:bg-[#f3f5f412] hover:bg-[#dbdbdb] rounded-2xl transition-colors duration-150' to={`/editor/${project._id}`}>
                                <div className='flex gap-x-6 md:gap-x-14 items-center'>
                                    <div className='w-8 h-8 md:w-12 md:h-12 rounded-md flex items-center justify-center bg-neutral-400 dark:bg-neutral-700'>
                                        <IoVideocam size={16} className='dark:text-neutral-900 text-neutral-100' />
                                    </div>
                                    <div className=''>
                                        <p className='text-base ml-[1.4rem] md:ml-2 font-medium max-w-md line-clamp-2'>{project.name}</p>
                                        <p className='ml-[1.4rem] md:ml-2 text-xs font-thin opacity-70'>Video</p>
                                    </div>
                                </div>
                                <p className='text-base hidden md:block font-medium opacity-90'>
                                    {format(new Date(project.updatedAt), 'MMM dd, hh:mm a')}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {modal && <NewProject
                handleClose={() => setModal(false)}
                handleSubmit={handleSubmit}
            />}
        </div>
    )
}
