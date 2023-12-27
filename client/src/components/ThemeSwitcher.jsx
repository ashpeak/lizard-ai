import React, { useState, useEffect } from 'react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

export default function ThemeSwitcher() {

    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        setTheme(theme);
    }

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        setMounted(true);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            setTheme(theme);
        } else setTheme('light');
    }, []);

    return (
        <>
            {mounted && <button type='button'
                className='p-2 rounded-lg transition-opacity duration-200 opacity-75 hover:opacity-100' onClick={toggleTheme}>{theme === "dark" ? <BsSunFill size={20} /> : <BsMoonFill size={20} />}</button>}
        </>
    )
}
