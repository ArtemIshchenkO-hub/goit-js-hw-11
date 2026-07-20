import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions.js';
import { getImagesByQuery, params } from './js/pixabay-api.js';

const searchForm = document.querySelector('.form');

const handleSubmit = e => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  params.q = formData.get('search-text').trim();

  clearGallery();
  showLoader();

  getImagesByQuery(params)
    .then(response => {
      if (response.data.hits.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      const images = createGallery(response.data.hits);
    })
    .catch(error => {
      iziToast.error({
        message: `${error.message}`,
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        position: 'topRight',
        pauseOnHover: false,
        close: false,
      });
    })
    .finally(() => hideLoader());
};

searchForm.addEventListener('submit', handleSubmit);
