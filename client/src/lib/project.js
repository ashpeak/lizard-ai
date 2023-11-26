import axios from 'axios';
import Cookies from 'js-cookie';

const createProject = async (project) => {
    return new Promise((resolve, reject) => {

        axios.post(process.env.REACT_APP_API + '/project/new', project, {
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
    const response = await axios.get(process.env.REACT_APP_API + '/project/getAll', {
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

export { createProject, getAllProjects };