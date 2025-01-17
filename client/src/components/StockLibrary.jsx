import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import ImageCard from './ImageCard';

export default function StockLibrary({ mediaQuery, selectImage, handleClose, mutation }) {
    const { data, isPending, isError } = mediaQuery;
    const [search, setSearch] = React.useState({
        query: '',
        type: 'video'
    });

    const handleSearch = (e) => {
        e.preventDefault();
        mutation(search);
    }

    return (
        <div>
            <div className='border-b border-border-light dark:border-border-dark w-full'>
                <form onSubmit={handleSearch}>
                    <div className='w-full px-2 md:px-4 py-3 flex items-center justify-between gap-x-4'>
                        <input
                            className="outline-none w-full h-10 rounded-3xl bg-primary-light dark:bg-primary-dark border border-neutral-400 px-4 opacity-70"
                            value={search.query}
                            onChange={(e) => setSearch({ ...search, query: e.target.value })}
                            type="text"
                            required
                            placeholder='Search for media (eg: Mountain)' />
                        <button type='submit' className='p-2 hover:bg-neutral-300 hover:dark:bg-neutral-700 transition-colors duration-200 flex items-center justify-center rounded-full'>
                            <FiArrowRight size={20} className='opacity-80' />
                        </button>
                    </div>
                    <div className='flex items-center gap-x-3 pl-4 mb-3'>
                        <label className='cursor-pointer flex items-center gap-[0.35rem]'>
                            <input type='radio' onChange={(e) => setSearch({ ...search, type: e.target.value })} name='type' value='video' className='accent-red-500' defaultChecked />
                            <p>Video</p>
                        </label>
                        <label className='cursor-pointer flex items-center gap-[0.35rem]'>
                            <input type='radio' onChange={(e) => setSearch({ ...search, type: e.target.value })} name='type' value='image' className='accent-red-500' />
                            <p>Image</p>
                        </label>
                        <label className='cursor-pointer flex items-center gap-[0.35rem]'>
                            <input type='radio' onChange={(e) => setSearch({ ...search, type: e.target.value })} name='type' value='gif' className='accent-red-500' />
                            <p>GIF</p>
                        </label>
                    </div>
                </form>
            </div>

            <div className='px-2 bg-primary-light dark:bg-primary-dark md:px-4 py-3 flex flex-wrap gap-5 overflow-y-scroll h-[70vh]'>
                {data?.length > 0 && data.map((media, index) => (
                    <button type='button' key={index} className='h-fit' onClick={() => {
                        const download = media.service === 'storyblocks' ? media.preview : media.download;
                        selectImage(media.thumbnail, download, media.type);
                        handleClose();
                    }}>
                        {/* <ImageCard key={Date.now()} type={media.type} title={media.name} href={media.thumbnail} service={media.service} /> */}
                        <ImageCard key={Date.now()} data={media} />
                    </button>
                ))}

                {(isPending) && (
                    <div className='w-full flex justify-center items-center'>
                        <p className='text-base opacity-70'>Loading images... </p>
                    </div>
                )}
                {isError && (
                    <div className='w-full flex justify-center items-center'>
                        <p className='text-base opacity-70'>Failed to load resources.</p>
                    </div>
                )}
                {(data?.length === 0 && !isPending && !isError) && (
                    <div className='w-full flex justify-center items-center'>
                        <p className='text-base opacity-70'>No images found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
