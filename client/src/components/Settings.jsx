import React from 'react'
import Mixer from './MusicMix';
import { FaMicrophone } from "react-icons/fa";

export default function Settings() {
    return (
        <div className='rounded-xl col-span-2 border border-border-light dark:border-border-dark h-full'>
            <div className='bg-neutral-800 flex items-center opacity-70 pl-4 rounded-t-xl h-10'>
                <FaMicrophone />
                <span className='ml-2'>Volume Mix</span>
            </div>
            <Mixer />
            {/* <p className='text-text-light dark:text-text-dark opacity-80'>Select a layer to make customizations.</p> */}
        </div>
    )
}
