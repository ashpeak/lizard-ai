import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const appUri = import.meta.env.VITE_REACT_APP_API;

export const getUserImages = async () => {
    try {
        const res = await axios.get(appUri + '/user/images', {
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
        const res = await axios.post(appUri + '/media', {
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

export const getStockMusic = async (query, filter) => {
    try {
        const res = await axios.post(appUri + '/media/music', {
            query: query,
            filter: filter
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

export const downloadYoutubeVideo = async (url, projectId, startTime = null, endTime = null) => {
    try {

        toast.info('Downloading...', { duration: 3000 });

        const res = await axios.post(appUri + '/media/youtube/download', {
            url: url,
            startTime: startTime,
            endTime: endTime
        }, {
            headers: {
                token: Cookies.get('token'),
                id: projectId
            },
        });

        if (res.status !== 200) {
            toast.error('Something went wrong', { duration: 3000 });
            return;
        } else {
            toast.success('Downloaded Successfully', { duration: 3000 });
            return res.data;
        }

    } catch (error) {
        console.log('Not authorized');
    }
}

export const getTubeDownloadedVideos = async () => {
    try {

        const res = await axios.get(appUri + '/media/youtube/download', {
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