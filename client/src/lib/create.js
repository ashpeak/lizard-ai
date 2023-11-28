import axios from 'axios';
import Cookies from 'js-cookie';

const createVideo = async (script, bgMusic, id) => {

  const arr = [];
  script.map((item, index) => arr.push({ dialogue: item.dialogue, image: item.image }));

  const data = {
    script: arr,
    bgMusic: bgMusic
  };

  try {
    const response = await axios.post(process.env.REACT_APP_API + '/v1/create', data, {
      headers: {
        'Content-Type': 'application/json',
        token: Cookies.get('token'),
        id: id
      }
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

const uploadImage = async (image) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('image', image);
    axios.post(process.env.REACT_APP_API + '/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: Cookies.get('token')
      }
    }).then((response) => {
      resolve(response.data.url);
    }).catch((error) => {
      reject(error);
    });
  });
}



export { createVideo, uploadImage };