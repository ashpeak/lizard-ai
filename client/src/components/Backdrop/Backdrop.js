import React from 'react'
import { motion } from 'framer-motion'

export default function Backdrop({ children, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClick}
            className='absolute top-0 left-0 w-full h-full bg-[#000000e1] flex items-end justify-center z-50'
        >
            {children}
        </motion.div>
    )
}
