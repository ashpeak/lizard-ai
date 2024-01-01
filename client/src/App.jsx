import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Editor from './components/Editor';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Files from './components/Files';
import Mixer from './components/Test';
import Feedback from './components/Feedback';
import Account from './components/Account';
import { auth } from './states/useAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import Verify from './components/Verify';
import Signup from './components/Signup';

function App() {

  const { checkAuth } = auth();
  const user = auth((state) => state.user);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <div className='dark:bg-primary-dark scroll-hide bg-primary-light min-h-screen text-text-light dark:text-text-dark'>
        <Navbar />
        <GoogleOAuthProvider clientId="1066475058855-qldr4edmbv65qvq19pcjj6s181nhsgav.apps.googleusercontent.com">
          <div className='px-3 md:px-5'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/files" element={user ? <Files /> : <Navigate to="/login" />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
              <Route path="login/verify" element={user ? <Navigate to="/" /> : <Verify />} />
              <Route path="/editor/:id" element={user ? <Editor /> : <Navigate to="/login" />} />
              <Route path="/test" element={<Mixer />} />
              <Route path="/feedback" element={user ? <Feedback /> : <Navigate to="/login" />} />
              <Route path="/account" element={user ? <Account /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </GoogleOAuthProvider>

        <Toaster richColors position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
