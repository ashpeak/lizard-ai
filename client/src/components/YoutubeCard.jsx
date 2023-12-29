/* eslint-disable react/prop-types */
import { useState } from 'react';
import { BiSolidImageAlt } from 'react-icons/bi';

const appUri = import.meta.env.VITE_REACT_APP_API;

export default function YoutubeCard({ name }) {

    const [isHovered, setIsHovered] = useState(false);
    const thumbnail = `${appUri}/media/youtube/${name.split('_')[0]}_thumbnail.png`;

    return (
        <div className='w-[7rem] md:w-[9rem] h-fit rounded-lg group'>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {isHovered ? (
                    <video autoPlay="" loop="" poster={thumbnail} className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg'>
                        <source src={`${appUri}/media/youtube/${name}`} type="video/mp4" />
                    </video>
                ) : (
                    <img src={thumbnail}
                        className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg cursor-pointer' alt='a person' />
                )}
            </div>

            <div className='w-full flex items-start opacity-70 gap-1 mt-2 group-hover:opacity-100 transition-opacity duration-200'>
                <BiSolidImageAlt size={15} className='min-w-[0.9375rem] min-h-[0.9375rem] h-full items-center' />
                <div className='flex flex-col items-start'>
                    <p className='line-clamp-2 text-xs font-light text-start break-all'>{name}</p>
                </div>
            </div>
        </div>
    )
}
