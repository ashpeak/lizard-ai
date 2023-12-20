import React, { useState } from 'react';
import { BiSolidImageAlt } from 'react-icons/bi';

export default function YoutubeCard() {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='w-[7rem] md:w-[9rem] h-fit rounded-lg group'>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {isHovered ? (
                    {/* <video autoplay="" poster={thumbnail} loop="" className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg'>
                        <source src={preview} type="video/mp4" />
                    </video> */},
                    <img src={"https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/rb-7xHyvolaxm256f/videoblocks-spacestars2-1_rij7pf276_thumbnail-180_01.jpg"}
                        className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg cursor-pointer' alt='a person' />
                ) : (
                    <img src={"https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/rb-7xHyvolaxm256f/videoblocks-spacestars2-1_rij7pf276_thumbnail-180_01.jpg"}
                        className='w-full h-[7rem] md:h-[8rem] object-cover rounded-lg cursor-pointer' alt='a person' />
                )}
            </div>

            <div className='w-full flex items-start opacity-70 gap-1 mt-2 group-hover:opacity-100 transition-opacity duration-200'>
                <BiSolidImageAlt size={15} className='min-w-[0.9375rem] min-h-[0.9375rem] h-full items-center' />
                <div className='flex flex-col items-start'>
                    <p className='line-clamp-2 text-xs font-light text-start'>Youtube Video</p>
                </div>
            </div>
        </div>
    )
}
