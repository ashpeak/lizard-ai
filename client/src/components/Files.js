import React, { useState } from 'react'
import { createProject, getAllProjects } from '../lib/project';
import { Toaster, toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Files() {

    const [projectData, setProjectData] = useState({
        name: '',
        idea: '',
        isAiGenerated: false,
    });

    const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: getAllProjects, refetchOnWindowFocus: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.promise(
            createProject(projectData),
            {
                loading: 'Wait creating project...',
                success: 'Project created successfully.',
                error: (err) => {
                    return "Error while creating project";
                },
                duration: 6000
            }
        );
    }

    return (
        <div>
            <h2>Start new project</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 w-[25rem]'>
                    <input type="text"
                        onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                        placeholder="Project name"
                        required
                        value={projectData.name} />

                    {projectData.isAiGenerated && (
                        <textarea placeholder="Project idea" required value={projectData.idea}
                            onChange={(e) => setProjectData({ ...projectData, idea: e.target.value })}
                        />)}

                    <div>
                        <label htmlFor="isAiGenerated">Is AI generated? &nbsp;</label>
                        <input
                            id='isAiGenerated'
                            type="checkbox"
                            onChange={() => setProjectData({ ...projectData, isAiGenerated: !projectData.isAiGenerated })}
                            checked={projectData.isAiGenerated} />
                    </div>

                    <button type='submit'>Create</button>
                </div>
            </form>

            <div>
                <h2 className='text-2xl font-bold'>Files</h2>
                <div className='flex flex-col'>
                    {isLoading && <p>Loading...</p>}
                    {data && data.map((project, index) => (
                        <div key={index} className='flex gap-4'>
                            <Link to={`/editor/${project._id}`}>
                                <p>{project.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <Toaster richColors position="bottom-right" />
        </div>
    )
}
