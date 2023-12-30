import axios from "axios";
import Cookies from "js-cookie";

const appUri = import.meta.env.VITE_REACT_APP_API;

const userAuth = {};

userAuth.login = async (user, method, access_token) => {

    const response = await axios.post(`${appUri}/user/login`, { userData: user, method, access_token });

    if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 2 });
    }
    return response.data;
}

userAuth.register = async (username, password) => {
    const response = await axios.post(appUri + '/user/register', { username, password });
    return response.data;
}

userAuth.profile = async () => {
    try {
        const response = await axios.get(appUri + '/user/profile', { headers: { token: Cookies.get('token') } });
        return response.data;
    } catch (error) {
        return false;
    }
}

export default userAuth;