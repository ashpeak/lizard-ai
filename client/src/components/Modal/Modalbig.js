import React from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import { AiOutlineClose } from 'react-icons/ai';
import ImageCard from '../ImageCard';
import { BiSolidImageAlt } from 'react-icons/bi';

export default function Modal({ handleClose, handleImage, images, selectImage }) {

    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                // initial="hidden"
                // animate="visible"
                // exit="exit"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className='bg-secondary-light dark:bg-secondary-dark border border-border-light dark:border-border-dark modal rounded-xl m-auto flex flex-col items-center'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='w-full'>
                    <div className='flex opacity-70 justify-between items-center border-b border-border-light dark:border-border-dark pr-4 bg-[#e7e5e5] dark:bg-[#292928] w-full rounded-t-xl'>
                        <div className='flex items-center gap-1 opacity-100 rounded-ss-xl px-4 py-2 hover:bg-neutral-300 transition-all duration-200 cursor-pointer hover:dark:bg-neutral-700'>
                            <BiSolidImageAlt size={15} />
                            <h2>My library</h2>
                        </div>
                        <motion.button className='p-[0.3rem] transition-colors duration-200 hover:dark:bg-[#535353] hover:text-[#fff] hover:bg-[#4d4d4d] focus:outline-none rounded-full' onClick={handleClose} whileTap={{ translateY: 1.1 }}>
                            <AiOutlineClose size={15} />
                        </motion.button>
                    </div>
                    <div className='border-b border-border-light dark:border-border-dark w-full'>
                        <div className='w-2/3 md:w-1/2 px-2 md:px-4 pt-2 pb-3'>
                            <label className="block opacity-70 mb-2 text-sm font-medium text-gray-900 dark:text-white" for="small_size">Upload</label>
                            <input className="block opacity-90 w-full text-xs text-gray-900 border border-gray-300 rounded-r-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" onChange={(e) => handleImage(e)} id="small_size" type="file" accept="image/*" />
                        </div>
                    </div>
                    <div className='px-2 md:px-4 py-3 flex flex-wrap gap-x-5 gap-y-5 overflow-y-scroll scroll-hide h-[19rem] md:h-[24rem]'>
                        {images.map((image, index) => (
                            <button type='button' onClick={() => {
                                selectImage(image);
                                handleClose();
                            }}>
                                <ImageCard key={Date.now()} title={"image.name"} href={image} />
                            </button>
                        ))}
                        {images.length === 0 && (
                            <div className='w-full flex justify-center items-center'>
                                <p className='text-base opacity-70'>No images</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    )
}
