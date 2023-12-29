import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import { FaArrowRight } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { auth } from '../states/useAuth';

export default function Navbar() {

  const user = auth((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='pb-5 pt-10 px-20 relative z-10 hidden md:block'>
        <div className='flex justify-between items-center'>
          <div className='flex items-baseline justify-between w-fit gap-5'>
            <Link to="/">
              <h2 className='text-2xl mr-6 font-bold hover:text-rose-500 transition-colors duration-150'>Blink.ai</h2>
            </Link>
            <Link to="/feedback" className='text-text-light dark:text-text-dark opacity-80 hover:opacity-95 font-medium text-xl transition-opacity duration-150'>Rate Us</Link>
            <Link to='https://www.linkedin.com/in/ashishsingh09dev/?profileId=ACoAADORLc0BWMD-J0FaT_yufN-D-HdTg3Td4JY' target='_blank' className='text-text-light dark:text-text-dark opacity-80 hover:opacity-95 font-medium text-xl transition-opacity duration-150'>LinkedIn</Link>
          </div>
          <div className='flex gap-3 items-center justify-between'>
            <ThemeSwitcher />

            {user ? (
              <Link to="/files">
                <button className='gap-1 p-[0.2rem] border dark:border-border-light rounded-full border-border-dark text-xl font-medium transition-opacity duration-150'>{user.avatar ? <img src={user.avatar} className='rounded-full opacity-90 hover:opacity-100' alt="User Profile" height={45} width={45} /> : <RxAvatar size={45} className='opacity-75 hover:opacity-95' />}</button>
              </Link>) : (
              <>
                <Link to="/login">
                  <button className='text-text-light dark:text-text-dark opacity-80 hover:opacity-95 font-medium text-xl transition-opacity duration-150'>Login</button>
                </Link>
                <Link to="/login">
                  <button className='bg-rose-600 hover:bg-rose-500 flex items-center gap-1 text-white text-xl font-medium px-3 py-1 rounded-3xl transition-colors duration-150'>Signup <FaArrowRight size={18} /></button>
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
      <div className='pb-5 pt-5 relative z-[999] md:hidden block w-full'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-baseline justify-between w-full gap-5 px-7'>
            <Link to="/">
              <h2 className='text-2xl mr-6 font-bold hover:text-rose-500 transition-colors duration-150'>Blink.ai</h2>
            </Link>
            <button onClick={() => setIsOpen(!isOpen)}>
              <span className='hidden dark:block'><svg width="25px" height="25px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7C4 6.44771 4.44772 6 5 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H5C4.44772 8 4 7.55229 4 7Z" fill="#fff" /><path d="M4 13.9998C4 13.4475 4.44772 12.9997 5 12.9997L16 13C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15L5 14.9998C4.44772 14.9998 4 14.552 4 13.9998Z" fill="#fff" /><path d="M5 19.9998C4.44772 19.9998 4 20.4475 4 20.9998C4 21.552 4.44772 21.9997 5 21.9997H22C22.5523 21.9997 23 21.552 23 20.9998C23 20.4475 22.5523 19.9998 22 19.9998H5Z" fill="#fff" /></svg></span>
              <span className='dark:hidden'><svg width="25px" height="25px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7C4 6.44771 4.44772 6 5 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H5C4.44772 8 4 7.55229 4 7Z" fill="#21201c" /><path d="M4 13.9998C4 13.4475 4.44772 12.9997 5 12.9997L16 13C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15L5 14.9998C4.44772 14.9998 4 14.552 4 13.9998Z" fill="#21201c" /><path d="M5 19.9998C4.44772 19.9998 4 20.4475 4 20.9998C4 21.552 4.44772 21.9997 5 21.9997H22C22.5523 21.9997 23 21.552 23 20.9998C23 20.4475 22.5523 19.9998 22 19.9998H5Z" fill="#21201c" /></svg></span>
            </button>
          </div>
          <div className={`flex flex-col py-5 fixed border-b-2 border-[#b5b5b5] dark:border-[#ffffff4d] bg-blur backdrop-blur-lg top-0 left-0 right-0 gap-3 w-full transition duration-500 transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} items-center justify-between`}>

            <div className='flex items-baseline justify-between w-full gap-5 px-7'>
              <Link onClick={() => setIsOpen(!isOpen)} to="/">
                <h2 className='text-2xl mr-6 font-bold hover:text-rose-500'>Blink.ai</h2>
              </Link>
              <button onClick={() => setIsOpen(!isOpen)}>
                <span className='hidden dark:block'><svg width="30px" height="30px" viewBox="0 0 0.65 0.65" fill="none" xmlns="http://www.w3.org/2000/svg"><path width="24" height="24" d="M0 0H0.75V0.75H0V0z" /><path d="m0.219 0.531 0.309 -0.309" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.03125" /><path d="m0.219 0.219 0.309 0.309" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.03125" /></svg></span>
                <span className='dark:hidden'><svg width="30px" height="30px" viewBox="0 0 0.65 0.65" fill="none" xmlns="http://www.w3.org/2000/svg"><path width="24" height="24" d="M0 0H0.75V0.75H0V0z" /><path d="m0.219 0.531 0.309 -0.309" stroke="#21201c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.03125" /><path d="m0.219 0.219 0.309 0.309" stroke="#21201c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.03125" /></svg></span>
              </button>
            </div>

            <Link onClick={() => setIsOpen(!isOpen)} to="/feedback" className='text-text-light dark:text-text-dark opacity-80 hover:opacity-95 font-medium text-xl transition-opacity duration-150'>Rate Us</Link>
            <Link onClick={() => setIsOpen(!isOpen)} to='https://www.linkedin.com/in/ashishsingh09dev/?profileId=ACoAADORLc0BWMD-J0FaT_yufN-D-HdTg3Td4JY' target='_blank' className='text-text-light dark:text-text-dark opacity-80 hover:opacity-95 font-medium text-xl transition-opacity duration-150'>LinkedIn</Link>
            <ThemeSwitcher />
            <Link onClick={() => setIsOpen(!isOpen)} to="/files">
              <button className='gap-1 opacity-75 hover:opacity-95 text-xl font-medium px-3 py-1 rounded-3xl transition-opacity duration-150'><RxAvatar size={45} /></button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
