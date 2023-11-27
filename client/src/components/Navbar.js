import React from 'react'
import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'

export default function Navbar() {
  return (
    <div className='py-5'>
      <div className='flex justify-between'>
        <div>
          <Link to="/">Blink.ai</Link>
        </div>
        <div className='flex gap-3'>
          <ThemeSwitcher />
          <Link to="/files">Files</Link>
          <Link to="/editor">Editor</Link>
          <Link to="/login">Login</Link>
          <Link to="/test">Test</Link>
        </div>
      </div>
    </div>
  )
}
