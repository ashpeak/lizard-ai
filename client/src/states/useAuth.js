import { create } from 'zustand';
import Cookies from 'js-cookie';
import axios from 'axios';

export const auth = create((set) => ({
    user: null,
    setUser: (user) => set({ user: user }),
    logout: () => {
        Cookies.remove('token');
        set({ user: null });
    },
    checkAuth: async () => {
        const token = Cookies.get('token');

        if (!token) {
            return false;
        }

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/user/checkAuth`, {
                headers: {
                    token: token
                }
            });

            set({ user: data });
            return true;
        } catch (err) {
            return false;
        }
    }
}));