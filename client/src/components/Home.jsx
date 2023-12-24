import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="relative w-full h-full scroll-hide">

      {/* Ambient Background */}
      <div className='absolute blur-2xl left-1/2 top-[18%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
        <div className='flex translate-y-6 md:translate-y-20'>
          <div className='w-40 h-40 md:w-[20rem] md:h-[20rem] md:-mr-2 circle_blue rounded-3xl'></div>
          <div className='w-40 h-40 md:w-[20rem] md:h-[20rem] md:-ml-2 circle_red rounded-3xl'></div>
        </div>
        <div className='w-[20rem] h-[20rem] -mt-12 circle_yellow rounded-3xl'></div>
      </div>

      <div className='w-full relative py-20 z-10 bg-transparent flex flex-col items-center justify-end'>
        <div className='max-w-[42rem]'>
          <h1 className='md:text-[3.5rem] text-[2.5rem] text-center leading-[2.8rem] md:leading-[3.8rem] font-extrabold'>Video creation made 10x simpler & faster with AI</h1>
        </div>
        <div className='max-w-[34rem] mt-8'>
          <p className='text-[1.2125rem] md:text-[1.4125rem] md:leading-[1.65rem] leading-[1.45rem] text-center text-zinc-700 dark:text-zinc-400'>Transform your ideas into stunning content with AI voices, using our text to video tool.</p>
        </div>

        <div className='mt-10'>
          <Link to='/signup'>
            <button className='bg-rose-600 hover:bg-rose-500 flex items-center gap-3 transition-colors duration-150 text-white font-bold py-3 px-8 rounded-full'>Start for free <FaArrowRight /></button>
          </Link>
        </div>

        <div className='md:px-16 px-4 mt-20'>
          <img src='/images/lizard.png' alt='lizard' className='h-full w-full rounded-2xl' />
        </div>
      </div>

      <div className='rounded-3xl mt-10 pb-14 flex flex-col items-center bg-neutral-300/50 dark:bg-[#26262673] opacity-90'>
        <div className='pt-14 max-w-[50rem]'>
          <h1 className='text-[2rem] dark:text-[#fafafa] text-text-light md:text-[2.5rem] text-center leading-[2.45rem] md:leading-[2.8rem] font-bold'>Savings, Speed, and Quality — you can have it all!</h1>
        </div>

        <div className='mt-16 flex md:flex-row flex-col justify-between items-center gap-8 px-10'>

          <div className='flex items-center justify-center flex-col'>
            <span className='opacity-90'>
              <svg viewBox="0 0 1000 1000" fill="#00a2c7" width="3rem" height="3rem"><path fill-rule="evenodd" clip-rule="evenodd" d="M822.945 394.435C822.945 394.435 915 445.086 915 499.694C915 554.303 822.945 604.953 822.945 604.953C822.945 604.953 867.859 699.994 835.773 744.167C803.718 788.296 699.577 775.103 699.577 775.103C699.577 775.103 680.227 878.567 628.273 895.453C576.426 912.305 500 840.372 500 840.372C500 840.372 423.643 912.66 371.727 895.831C319.76 878.984 300.423 775.481 300.423 775.481C300.423 775.481 196.339 788.632 164.227 744.544C131.997 700.294 177.055 604.953 177.055 604.953C177.055 604.953 85.0969 554.303 85.0001 499.694C84.9031 444.975 177.055 394.058 177.055 394.058C177.055 394.058 131.927 298.666 164.227 254.467C196.39 210.456 300.423 223.908 300.423 223.908C300.423 223.908 319.773 120.444 371.727 103.558C423.574 86.7061 500 158.64 500 158.64C500 158.64 576.42 86.7235 628.273 103.558C680.353 120.466 699.577 224.285 699.577 224.285C699.577 224.285 803.718 211.092 835.773 255.221C867.859 299.394 822.945 394.435 822.945 394.435ZM398.59 638.764V360.032C398.59 338.778 421.884 325.863 439.824 337.432L657.776 476.529C674.376 487.291 674.376 511.505 657.776 521.998L439.824 661.363C421.884 672.932 398.59 660.018 398.59 638.764Z"></path></svg>
            </span>
            <h2 className='mt-2 text-[1.2125rem] md:text-[1.4125rem] leading-[1.6125rem] font-bold text-center opacity-90'>Simple Editor</h2>
            <p className='mt-2 text-[1.125rem] text-center opacity-70'>Bulbul makes creating videos as simple as writing an email with its script based editor.</p>
          </div>
          <div className='flex items-center justify-center flex-col'>
            <span className='opacity-90'>
              <svg viewBox="0 0 24 24" fill="#ffc53d" width="3rem" height="3rem"><g><rect fill="none" height="24" width="24"></rect></g><g><path d="M10.67,21L10.67,21c-0.35,0-0.62-0.31-0.57-0.66L11,14H7.5c-0.88,0-0.33-0.75-0.31-0.78c1.26-2.23,3.15-5.53,5.65-9.93 c0.1-0.18,0.3-0.29,0.5-0.29h0c0.35,0,0.62,0.31,0.57,0.66L13.01,10h3.51c0.4,0,0.62,0.19,0.4,0.66c-3.29,5.74-5.2,9.09-5.75,10.05 C11.07,20.89,10.88,21,10.67,21z"></path></g></svg>
            </span>
            <h2 className='mt-2 text-[1.2125rem] md:text-[1.4125rem] leading-[1.6125rem] font-bold text-center opacity-90'>Fast creation</h2>
            <p className='mt-2 text-[1.125rem] text-center opacity-70'>Create videos with lifelike voiceovers in minutes, powered using AI.</p>
          </div>
          <div className='flex items-center justify-center flex-col'>
            <span className='opacity-90'>
              <svg viewBox="0 0 24 24" fill="#46a758" width="3rem" height="3rem"><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12.88,17.76v0.36c0,0.48-0.39,0.88-0.88,0.88h0 c-0.48,0-0.88-0.39-0.88-0.88v-0.42c-0.63-0.15-1.93-0.61-2.69-2.1c-0.23-0.44-0.01-0.99,0.45-1.18l0.07-0.03 c0.41-0.17,0.87,0,1.08,0.39c0.32,0.61,0.95,1.37,2.12,1.37c0.93,0,1.98-0.48,1.98-1.61c0-0.96-0.7-1.46-2.28-2.03 c-1.1-0.39-3.35-1.03-3.35-3.31c0-0.1,0.01-2.4,2.62-2.96V5.88C11.12,5.39,11.52,5,12,5h0c0.48,0,0.88,0.39,0.88,0.88v0.37 c1.07,0.19,1.75,0.76,2.16,1.3c0.34,0.44,0.16,1.08-0.36,1.3l0,0C14.32,9,13.9,8.88,13.66,8.57c-0.28-0.38-0.78-0.77-1.6-0.77 c-0.7,0-1.81,0.37-1.81,1.39c0,0.95,0.86,1.31,2.64,1.9c2.4,0.83,3.01,2.05,3.01,3.45C15.9,17.17,13.4,17.67,12.88,17.76z"></path></svg>
            </span>
            <h2 className='mt-2 text-[1.2125rem] md:text-[1.4125rem] leading-[1.6125rem] font-bold text-center opacity-90'>Cost effective</h2>
            <p className='mt-2 text-[1.125rem] text-center opacity-70'>Create high-quality content at scale at a fraction of the cost.</p>
          </div>

        </div>
      </div>
    </div>
  )
}
