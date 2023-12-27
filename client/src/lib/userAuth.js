import axios from "axios";
import Cookies from "js-cookie";

export const userAuth = {};

userAuth.login = async (user, method, access_token) => {
    const response = await axios.post(process.env.REACT_APP_API + '/user/login', { userData: user, method, access_token });
    
    if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 2 });
    }
    return response.data;
}

userAuth.register = async (username, password) => {
    const response = await axios.post(process.env.REACT_APP_API + '/user/register', { username, password });
    return response.data;
}

userAuth.logout = async () => {
    const response = await axios.get(process.env.REACT_APP_API + '/user/logout');
    return response.data;
}

export default userAuth;