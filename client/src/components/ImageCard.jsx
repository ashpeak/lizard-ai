import React from 'react';
import { BiSolidImageAlt } from 'react-icons/bi';

export default function ImageCard({ href, title, id }) {
    return (
        <div className='w-[7rem] md:w-[9rem] h-fit rounded-lg group'>
            <img src={href}
                className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg cursor-pointer' alt='a person' />
            <div className='w-full flex items-start opacity-70 gap-1 mt-2 group-hover:opacity-100 transition-opacity duration-200'>
                <BiSolidImageAlt size={15} className='min-w-[0.9375rem] min-h-[0.9375rem] h-full items-center' />
                <p className='line-clamp-2 text-xs font-light'>{title}</p>
            </div>
        </div>
    )
}
