import React from 'react'
import { motion } from 'framer-motion'

export default function Backdrop({ children, onClick, position = 'items-end' }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClick}
            className={`absolute top-0 left-0 w-full h-full bg-[#000000e1] flex justify-center z-50 ${position}`}
        >
            {children}
        </motion.div>
    )
}
