import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import { getGenres } from './fetchGenres';
import movieCardTpl from './../templates/movie-card.hbs';
import axios from 'axios';
import { openModal } from './modal-movie';

const moviesList = document.querySelector('.movie-list');
const guard = document.querySelector('.guard');

async function fetchInitialData() {
  try {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/trending/all/day`, {
      params: {
        api_key: API_KEY,
      },
    });

    return results;
  } catch (err) {
    return err;
  }
}

async function convertResponseDataToObject(results) {
  const genresDictionary = await getGenres();
  return results.map(elem => {
    return {
      title: elem.title ? elem.title : elem.name,
      id: elem.id,
      image: `${IMG_URL + elem.poster_path}`,
      year: new Date(
        elem.first_air_date ? elem.first_air_date : elem.release_date
      ).getFullYear(),
      genres: elem.genre_ids
        .map((genreId, index) => {
          if (index < 2) {
            return genresDictionary[genreId]?.name;
          }
          if (index === 2) {
            return 'Other';
          }
          if (index > 2) {
            return '';
          }
        })
        .filter(elem => elem !== '')
        .join(', '),
    };
  });
}

export async function renderUI() {
  fetchInitialData()
    .then(convertResponseDataToObject)
    .then(data => {
      moviesList.innerHTML = data.map(elem => movieCardTpl(elem)).join('');

      // Adds event listeners to the movies list DOM element
      const movieCards = document.querySelector('.movie-list');
      movieCards.addEventListener('click', evt => {
        evt.preventDefault();
        let t = evt.target;
        while (t.nodeName !== 'A' && t.parentNode !== null) {
          t = t.parentNode;
        }

        if (t.nodeName === 'A') {
          const movieId = parseInt(t.id);
          openModal(movieId);
        }
      });
    });
}
