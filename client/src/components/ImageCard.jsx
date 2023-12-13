import React, { useState } from 'react';
import { BiSolidImageAlt } from 'react-icons/bi';

export default function ImageCard({ data }) {

    const [isHovered, setIsHovered] = useState(false);
    const { name, thumbnail, preview, type, service } = data;

    return (
        <div className='w-[7rem] md:w-[9rem] h-fit rounded-lg group'>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {type === 'video' && (isHovered ? (
                    <video autoplay="" poster={thumbnail} loop="" className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg'>
                        <source src={preview} type="video/mp4" />
                    </video>) : (
                    <img src={thumbnail}
                        className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg cursor-pointer' alt='a person' />
                ))}

                {type === 'gif' && (isHovered ? (
                    <img src={preview}
                        className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg cursor-pointer' alt='a person' />) : (
                    <img src={thumbnail}
                        className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg cursor-pointer' alt='a person' />
                ))}

                {type === 'image' && <img src={thumbnail}
                    className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg cursor-pointer' alt='a person' />}
            </div>

            <div className='w-full flex items-start opacity-70 gap-1 mt-2 group-hover:opacity-100 transition-opacity duration-200'>
                <BiSolidImageAlt size={15} className='min-w-[0.9375rem] min-h-[0.9375rem] h-full items-center' />
                <div className='flex flex-col items-start'>
                    <p className='line-clamp-2 text-xs font-light text-start'>{name}</p>
                    {service === "giphy" && <img src='/images/giphy.png' className='w-auto h-[0.7rem] mt-[0.15rem] bg-neutral-500' alt='fliki' />}
                </div>
            </div>
        </div>
    )
}
