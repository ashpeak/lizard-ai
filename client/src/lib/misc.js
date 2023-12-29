import axios from "axios";
import Cookies from "js-cookie";

export const misc = {};

misc.sendFeedback = async (rating) => {
    const response = await axios.post(process.env.REACT_APP_API + '/user/feedback', rating, {
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
    const response = await axios.get(process.env.REACT_APP_API + '/user/feedback/all');

    if (response.status === 200) {
        return response.data;
    }
    return false;
}