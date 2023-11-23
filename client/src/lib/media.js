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
            query: search.query,
            type: search.type
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

export const getStockMusic = async (search) => {
    try {
        const res = await axios.post(process.env.REACT_APP_API + '/media/music', {
            query: search.query,
            filter: search.filter
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