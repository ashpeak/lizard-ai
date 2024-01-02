import axios from 'axios';
import Cookies from 'js-cookie';

const appUri = import.meta.env.VITE_REACT_APP_API;

const createProject = async (project) => {
    return new Promise((resolve, reject) => {

        axios.post(appUri + '/project/new', project, {
            headers: {
                'Content-Type': 'application/json',
                token: Cookies.get('token')
            }
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

const getAllProjects = async () => {
    const response = await axios.get(appUri + '/project/getAll', {
        headers: {
            'Content-Type': 'application/json',
            token: Cookies.get('token')
        }
    });

    if (response.status !== 200) {
        return null;
    }

    return response.data;
}

const getProjectById = async (id) => {
    const response = await axios.get(appUri + '/project/getById/' + id, {
        headers: {
            'Content-Type': 'application/json',
            token: Cookies.get('token')
        }
    });

    if (response.status !== 200) {
        return null;
    }

    return response.data;
}

export { createProject, getAllProjects, getProjectById };