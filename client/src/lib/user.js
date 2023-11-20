import axios from 'axios';
import Cookies from 'js-cookie';

export const getImages = async () => {
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