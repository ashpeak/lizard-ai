import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import ImageCard from './ImageCard';

export default function StockLibrary({ data, isPending, isError, selectImage, handleClose }) {
    return (
        <div>
            <div className='border-b border-border-light dark:border-border-dark w-full'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='w-full px-2 md:px-4 py-3 flex items-center justify-between gap-x-4'>
                        <input className="outline-none w-full h-10 rounded-3xl bg-primary-light dark:bg-primary-dark border border-neutral-400 px-4 opacity-70" onChange={(e) => { }} type="text"
                            required
                            placeholder='Search for media (eg: Mountain)' />
                        <button type='submit' className='p-2 hover:bg-neutral-300 hover:dark:bg-neutral-700 transition-colors duration-200 flex items-center justify-center rounded-full'>
                            <FiArrowRight size={20} className='opacity-80' />
                        </button>
                    </div>
                </form>
            </div>

            <div className='px-2 md:px-4 py-3 flex flex-wrap gap-x-5 gap-y-5 overflow-y-scroll scroll-hide h-screen'>
                {data.length > 0 && data.map((media, index) => (
                    <button type='button' key={index} className='h-fit' onClick={() => {
                        selectImage(media.thumbnail);
                        handleClose();
                    }}>
                        <ImageCard key={Date.now()} title={media.name} href={media.thumbnail} />
                    </button>
                ))}
            </div>
        </div>
    )
}
