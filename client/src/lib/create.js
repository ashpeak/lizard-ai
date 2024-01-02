import axios from 'axios';
import Cookies from 'js-cookie';

const appUri = import.meta.env.VITE_REACT_APP_API;

const createVideo = async (script, bgMusic, musicState, id) => {

  const arr = [];
  script.map((item, index) => arr.push({ index: index + 1, dialogue: item.dialogue, media: item.download, type: item.type }));

  const data = {
    script: arr,
    bgMusic: bgMusic,
    volumeMix: {
      speech: musicState.voiceover,
      bgMusic: musicState.music
    },
    subtitlePosition: musicState.subtitlePosition
  };

  try {
    const response = await axios.post(appUri + '/v1/create', data, {
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
    axios.post(appUri + '/image', formData, {
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

const downloadVideo = async (projectId) => {
  return new Promise((resolve, reject) => {
    axios.get(appUri + '/user/video/download/' + projectId, {
      responseType: 'blob',
      headers: {
        token: Cookies.get('token')
      }
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'video.mp4'); // or any other name you want
      document.body.appendChild(link);
      link.click();

      resolve(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
}


export { createVideo, uploadImage, downloadVideo };