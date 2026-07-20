import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions.js';
import getImagesByQuery from './js/pixabay-api.js';

const searchForm = document.querySelector('.form');

const handleSubmit = e => {
  e.preventDefault();

  const input = e.currentTarget.elements['search-text'];
  const query = input.value.trim();
  if (!query) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      backgroundColor: '#EF4040',
      messageColor: '#fff',
      position: 'topRight',
      pauseOnHover: false,
      close: false,
    });

    input.value = '';
    clearGallery();
    hideLoader();
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(response => {
      if (response.hits.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      createGallery(response.hits);
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
