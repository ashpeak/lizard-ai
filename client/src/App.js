import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Editor from './components/Editor';
import Navbar from './components/Navbar';
import Login from './components/Login';
import axios from 'axios';
import Cookies from 'js-cookie';
import Files from './components/Files';
import Mixer from './components/Test';

function App() {

  const checkAuth = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API + '/user/checkAuth', {
        headers: {
          token: Cookies.get('token')
        }
      });
      if (res.status !== 200) {
        console.log('Not authorized');
        console.log(res.data.msg);
      } else console.log('Authorized');

    } catch (error) {
      console.log('Not authorized');
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <div className='dark:bg-primary-dark scroll-hide bg-primary-light min-h-screen px-3 md:px-5 text-text-light dark:text-text-dark'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/files" element={<Files />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/test" element={<Mixer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
