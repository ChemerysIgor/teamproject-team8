import { API_KEY, BASE_URL, IMG_URL } from './api-service';
import movieCardTpl from './../templates/movie-card.hbs';
import { getCurrentPage } from './getCurrentPage';
import { openModal } from './modal-movie';
import Notiflix from 'notiflix';
import { queuedListHandler } from './queuedList';
import { AddListenerToMovieList } from './modal-movie';

function storageLibraryChecker() {
  if (localStorage.getItem('theme') !== null) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}
storageLibraryChecker();

getCurrentPage();

const movie_id = JSON.parse(localStorage.getItem('WatchedList'));

movie_id.forEach(element => {
  const watchedList = document.querySelector('.movie-list.watched');

  const libraryWatchedListEl = document.createElement('li');

  libraryWatchedListEl.classList.add('movie-item');
  libraryWatchedListEl.innerHTML = `
      <a href='${element.id}' id = '${element.id}' class='movie-link'>
    <img src='${IMG_URL}${element.poster_path}' alt='' class='movie-image' />
    <div class='movie-info'>
      <p class='movie-title'>${element.original_title}</p>
      <p class='movie-description'>${element.genres
        .map(elem => `${elem.name}`)
        .join(', ')} | ${element.release_date}</p>
    </div>
  </a>
      `;

  watchedList.appendChild(libraryWatchedListEl);
});

const queuedListForClick = document.querySelector('.movie-list.queued');
const watchedListForClick = document.querySelector('.movie-list.watched');
const queuedTitleOnClick = document.querySelector('.page-heading.queued');
const watchedTitleOnClick = document.querySelector('.page-heading.watched');

const queuedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonQueue'
);
queuedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  queuedBtnLibrary.disabled = true;
  watchedListForClick.style.display = 'none';
  watchedTitleOnClick.style.display = 'none';
  queuedListForClick.style.display = 'flex';
  queuedTitleOnClick.style.display = 'block';
  watchedBtnLibrary.disabled = false;
});

const watchedBtnLibrary = document.getElementById(
  'js-navigationLibraryButtonWatched'
);

watchedBtnLibrary.addEventListener('click', e => {
  e.preventDefault();
  watchedBtnLibrary.disabled = true;
  queuedListForClick.style.display = 'none';
  queuedTitleOnClick.style.display = 'none';
  watchedListForClick.style.display = 'flex';
  watchedTitleOnClick.style.display = 'block';
  queuedBtnLibrary.disabled = false;
});

AddListenerToMovieList();
queuedListHandler();
