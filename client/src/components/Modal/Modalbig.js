import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidImageAlt } from 'react-icons/bi';
import { IoLibrary } from 'react-icons/io5';
import MyLibrary from '../MyLibrary';
import StockLibrary from '../StockLibrary';


export default function Modal({ handleClose, handleImage, images, selectImage, pending, error, mediaQuery, mutation }) {
    const [active, setActive] = useState("stock");

    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                // initial="hidden"
                // animate="visible"
                // exit="exit"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className='bg-secondary-light dark:bg-secondary-dark border border-border-light dark:border-border-dark modal rounded-xl flex flex-col items-center'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='w-full'>
                    <div className='flex opacity-70 justify-between items-center border-b border-border-light dark:border-border-dark pr-4 bg-[#e7e5e5] dark:bg-[#292928] w-full rounded-t-xl'>
                        <div className='flex items-center'>
                            <button onClick={() => setActive("stock")} className={(active === "stock" ? "border-b border-text-light dark:border-border-light" : "") + ' flex items-center gap-1 rounded-ss-xl opacity-100 px-4 py-2 hover:bg-neutral-300 transition-colors duration-200 cursor-pointer hover:dark:bg-neutral-700'}>
                                <IoLibrary size={15} />
                                <h2>Stock library</h2>
                            </button>
                            <button onClick={() => setActive("my")} className={(active === "my" ? "border-b border-text-light dark:border-border-light" : "") + ' flex items-center gap-1 opacity-100 px-4 py-2 hover:bg-neutral-300 transition-colors duration-200 cursor-pointer hover:dark:bg-neutral-700'}>
                                <BiSolidImageAlt size={15} />
                                <h2>My library</h2>
                            </button>
                        </div>
                        <motion.button className='p-[0.3rem] transition-colors duration-200 hover:dark:bg-[#535353] hover:text-[#fff] hover:bg-[#4d4d4d] focus:outline-none rounded-full' onClick={handleClose} whileTap={{ translateY: 1.1 }}>
                            <AiOutlineClose size={15} />
                        </motion.button>
                    </div>

                    {active === "my" ? (
                        <MyLibrary
                            handleClose={handleClose}
                            handleImage={handleImage}
                            images={images}
                            selectImage={selectImage}
                            isPending={pending}
                            isError={error} />
                    ) : (
                        <StockLibrary
                            mediaQuery={mediaQuery}
                            selectImage={selectImage}
                            mutation={mutation}
                            handleClose={handleClose} />
                    )}
                </div>
            </motion.div>
        </Backdrop>
    )
}
