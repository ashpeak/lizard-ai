import axios from "axios";
import Cookies from "js-cookie";

const appUri = import.meta.env.VITE_REACT_APP_API;

export const misc = {};

misc.sendFeedback = async (rating) => {
    const response = await axios.post(appUri + '/user/feedback', rating, {
        headers: {
            token: Cookies.get('token')
        }
    });

    if (response.status === 200) {
        return true;
    }
    return false;
}

misc.getTestimonials = async () => {
    const response = await axios.get(appUri + '/user/feedback/all');

    if (response.status === 200) {
        return response.data;
    }
    return false;
}