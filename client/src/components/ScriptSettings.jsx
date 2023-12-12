import React from 'react';
import { FaMicrophone } from "react-icons/fa";
import { settings } from '../states/settings';

const ScriptSettings = () => {

    const position = settings(state => state.subtitlePosition);
    const setPosition = settings(state => state.setSubtitlePosition);

    return (
        <div className='w-full'>
            <div className='bg-neutral-800 flex items-center opacity-70 pl-4 rounded-t-xl h-10'>
                <FaMicrophone className='text-slate-50 dark:text-text-dark' />
                <span className='ml-2 text-slate-50 dark:text-text-dark'>Voiceover</span>
            </div>

            <div className='px-4 pt-4'>
                <p className='text-text-light dark:text-text-dark opacity-80'>Subtitle</p>

                <p className='mt-5 opacity-80 text-sm'>Position</p>
                <div className='grid grid-cols-3 gap-1 w-fit'>
                    <button type='button' onClick={() => setPosition(7)} className={(position === 7 ? 'bg-rose-500' : 'dark:bg-neutral-700 bg-neutral-400') + ` h-5 w-5 border-transparent hover:border-rose-500 border transition-colors duration-150 rounded-sm`}></button>
                    <button type='button' onClick={() => setPosition(8)} className={(position === 8 ? 'bg-rose-500' : 'dark:bg-neutral-700 bg-neutral-400') + ` h-5 w-5 border-transparent hover:border-rose-500 border transition-colors duration-150 rounded-sm`}></button>
                    <button type='button' onClick={() => setPosition(9)} className={(position === 9 ? 'bg-rose-500' : 'dark:bg-neutral-700 bg-neutral-400') + ` h-5 w-5 border-transparent hover:border-rose-500 border transition-colors duration-150 rounded-sm`}></button>

                    <button type='button' onClick={() => setPosition(4)} className={(position === 4 ? 'bg-rose-500' : 'dark:bg-neutral-700 bg-neutral-400') + ` h-5 w-5 border-transparent hover:border-rose-500 border transition-colors duration-150 rounded-sm`}></button>
                    <button type='button' onClick={() => setPosition(5)} className={(position === 5 ? 'bg-rose-500' : 'dark:bg-neutral-700 bg-neutral-400') + ` h-5 w-5 border-transparent hover:border-rose-500 border transition-colors duration-150 rounded-sm`}></button>
                    <button type='button' onClick={() => setPosition(6)} className={(position === 6 ? 'bg-rose-500' : 'dark:bg-neutral-700 bg-neutral-400') + ` h-5 w-5 border-transparent hover:border-rose-500 border transition-colors duration-150 rounded-sm`}></button>

                    <button type='button' onClick={() => setPosition(1)} className={(position === 1 ? 'bg-rose-500' : 'dark:bg-neutral-700 bg-neutral-400') + ` h-5 w-5 border-transparent hover:border-rose-500 border transition-colors duration-150 rounded-sm`}></button>
                    <button type='button' onClick={() => setPosition(10)} className={(position === 10 ? 'bg-rose-500' : 'dark:bg-neutral-700 bg-neutral-400') + ` h-5 w-5 border-transparent hover:border-rose-500 border transition-colors duration-150 rounded-sm`}></button>
                    <button type='button' onClick={() => setPosition(3)} className={(position === 3 ? 'bg-rose-500' : 'dark:bg-neutral-700 bg-neutral-400') + ` h-5 w-5 border-transparent hover:border-rose-500 border transition-colors duration-150 rounded-sm`}></button>
                </div>

                <div className='mt-5'>
                    <p className='text-text-light dark:text-text-dark opacity-80'>Font</p>

                    <div className='rounded-2xl w-fit opacity-80 border border-border-dark dark:border-border-light px-2 mt-2'>
                        <span>Nunito</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScriptSettings;