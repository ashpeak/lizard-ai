import axios from 'axios';
import Cookies from 'js-cookie';

export const getUserImages = async () => {
    try {
        const res = await axios.get(process.env.REACT_APP_API + '/user/images', {
            headers: {
                token: Cookies.get('token')
            }
        });
        if (res.status !== 200) {
            return [];
        } else return res.data.images;

    } catch (error) {
        console.log('Not authorized');
    }
}

export const getStockMedia = async (search) => {
    try {
        const res = await axios.post(process.env.REACT_APP_API + '/media', {
            search: search
        }, {
            headers: {
                token: Cookies.get('token')
            },
        });
        if (res.status !== 200) {
            return [];
        } else return res.data;

    } catch (error) {
        console.log('Not authorized');
    }
}