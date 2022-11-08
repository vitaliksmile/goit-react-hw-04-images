import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';
const API_KEY = '30385441-4dc71e17a68e39215af6d5e3c';
const searchNewApi = (query, page = 1) => {
  return axios
    .get('/api/?', {
      params: {
        q: query,
        page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    })
    .then(response => {
      return response.data;
    });
};

export default searchNewApi;
