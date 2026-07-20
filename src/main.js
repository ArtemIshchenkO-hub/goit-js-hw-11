import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';

const searchForm = document.querySelector('.form');

const handleSubmit = e => {
  e.preventDefault();

  const input = e.currentTarget.elements['search-text'];
  const query = input.value.trim();
  if (!query) {
    iziToast.error({
      message: 'Search field cannot be empty!',
      backgroundColor: '#EF4040',
      messageColor: '#fff',
      position: 'topRight',
      pauseOnHover: false,
      close: false,
    });

    input.value = '';
    clearGallery();
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(response => {
      if (response.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#EF4040',
          messageColor: '#fff',
          position: 'topRight',
          pauseOnHover: false,
          close: false,
        });

        return;
      }
      createGallery(response.hits);
    })
    .catch(error => {
      console.error(error);

      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
      });
    })
    .finally(() => hideLoader());
};

searchForm.addEventListener('submit', handleSubmit);
