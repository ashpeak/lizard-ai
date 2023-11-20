import axios from 'axios';
import Cookies from 'js-cookie';

const handleImagesChange = (images) => {

  // Modify the names of the selected files
  const modifiedImages = Array.from(images).map((file) => {
    // Modify the file name here (e.g., add a timestamp)
    const modifiedFileName = `prefix_${Date.now()}_${file.image.name}`;

    // Create a new File object with the modified name
    return new File([file.image], modifiedFileName, {
      type: file.image.type,
    });
  });

  console.log(modifiedImages);
};

const createVideo = async (script) => {
  
  const formData = new FormData();
  formData.append('script', JSON.stringify(script));


  handleImagesChange(script);
  script.forEach((item, index) => {
    if (item.image) {
      formData.append(`image`, item.image);
    }
  });

  // const response = await axios.post(process.env.REACT_APP_API + '/v1/videos', formData, {
  const response = await axios.post(process.env.REACT_APP_API + '/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  // const res = await response.json();
  console.log(response.data);
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

export default createVideo;
export { uploadImage };