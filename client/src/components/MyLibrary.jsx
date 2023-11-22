import React from 'react'
import ImageCard from './ImageCard';

export default function MyLibrary({ handleClose, handleImage, images, selectImage, isPending, isError }) {
    return (
        <div>
            <div className='border-b border-border-light dark:border-border-dark w-full'>
                <div className='w-2/3 md:w-1/2 px-2 md:px-4 pt-2 pb-3'>
                    <label className="block opacity-70 mb-2 text-sm font-medium text-gray-900 dark:text-white" for="small_size">Upload</label>
                    <input className="block w-full text-xs text-gray-900 border border-gray-300 rounded-r-lg cursor-pointer bg-primary-light dark:text-gray-400 focus:outline-none dark:bg-primary-dark dark:border-gray-600 dark:placeholder-gray-400" onChange={(e) => handleImage(e)} id="small_size" type="file" accept="image/*" />
                </div>
            </div>

            <div className='px-2 bg-primary-dark md:px-4 py-3 flex flex-wrap gap-x-5 gap-y-5 overflow-y-scroll scroll-hide h-screen'>
                {images?.length > 0 && images.map((image, index) => (
                    <button type='button' key={index} className='h-fit' onClick={() => {
                        selectImage(image);
                        handleClose();
                    }}>
                        <ImageCard key={Date.now()} title={"image.name"} href={image} />
                    </button>
                ))}
                {images?.length === 0 && (
                    <div className='w-full flex justify-center items-center'>
                        <p className='text-base opacity-70'>
                            {isPending && "Loading images..."}
                            {isError && "Failed to load resources."}
                            {images?.length === 0 && !isPending && !isError && "No images found."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
