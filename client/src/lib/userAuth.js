import axios from "axios";
import Cookies from "js-cookie";

const appUri = import.meta.env.VITE_REACT_APP_API;

const userAuth = {};

userAuth.login = async (user = null, method, access_token = null) => {

    try {
        const response = await axios.post(`${appUri}/user/login`, { user, method, access_token });

        if (response.data.token) {
            Cookies.set('token', response.data.token, { expires: 2 });
        }

        return "Login successful";
    } catch (error) {
        console.log(error.response.data, typeof error.response.data);
        return error.response.data;
    }
}

userAuth.sendEmail = (email) => {
    return new Promise((resolve, reject) => {
        axios.post(appUri + '/user/sendEmail', { email })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response.data);
            });
    });
}

userAuth.signup = (user) => {
    return new Promise((resolve, reject) => {
        axios.post(appUri + '/user/signup', { user })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response.data);
            });
    });
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