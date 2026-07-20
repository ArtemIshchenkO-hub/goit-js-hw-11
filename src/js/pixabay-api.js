import axios from 'axios';

const API_KEY = '56778535-647a0d2fab6513f9c5838607a';

const pixabayApi = axios.create({ baseURL: 'https://pixabay.com/api/' });

export default function getImagesByQuery(query) {
  return pixabayApi
    .get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
