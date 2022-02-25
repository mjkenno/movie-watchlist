'use strict';

import MovieList from '../js/movielist.js'

const LOGIN_BTN = document.querySelector('#login-btn');
const JOIN_BTN = document.querySelector('#join-btn');
const ACC_MODAL = document.querySelector('#account-modal');

const FORM = document.querySelector('form');    
const TITLE = document.querySelector('#title');

const ADD_BTN = document.querySelector('#add-btn');

const WATCH_RADIO = document.querySelector('#to-watch');
const FAV_RADIO = document.querySelector('#favourite');

const WATCHLIST_EL = document.querySelector('#watchlist');
const FAVOURITES_EL = document.querySelector('#favourites');
const WATCHLIST_PLACEHOLDER = document.querySelector('#watchlist-placeholder');
const FAVOURITES_PLACEHOLDER = document.querySelector(
  '#favourites-placeholder'
);

const addBtnClickHandler = (ev) => {
  if (WATCH_RADIO.checked && TITLE.value) {
    ev.preventDefault();
    watchList.createMovie();
    FORM.reset();
  } else if (FAV_RADIO.checked && TITLE.value) {
    ev.preventDefault();
    favList.createMovie();
    FORM.reset();
  }
};

const watchListClickHandler = (ev) => {
  if (ev.target.matches('#fav-btn')) {
    const removeBtn = ev.target.nextElementSibling;
    const switchedMovie = ev.target.closest('.movie-card');

    const [switchedMovieObj] = watchList.movies.filter((movie) => {
      if (movie.ID === switchedMovie.id) {
        return movie;
      }
    });

    favList.switchMovie(switchedMovieObj);
    removeBtn.click();

  } else if (ev.target.matches('#remove-btn')) {
    const targetMovieID = ev.target.closest('.movie-card').id;

    const updatedMovies = watchList.movies.filter((movie) => {
      return movie.ID != targetMovieID;
    });

    watchList.movies = updatedMovies;
    ev.target.closest('.movie-card').remove();

    if (WATCHLIST_EL.children.length === 1) {
      WATCHLIST_PLACEHOLDER.style.display = 'block';
    }
  }
};

const favListClickHandler = (ev) => {
  // If the click event is on the remove button of a movie card, remove it from the movielist.
  if (ev.target.matches('#remove-btn')) {
    const targetMovieID = ev.target.closest('.movie-card').id;

    const updatedMovies = favList.movies.filter((movie) => {
      return movie.ID != targetMovieID;
    });

    favList.movies = updatedMovies;
    ev.target.closest('.movie-card').remove();

    if (FAVOURITES_EL.children.length == 1) {
      FAVOURITES_PLACEHOLDER.style.display = 'block';
    }
  }
};

const dragStartHandler = (ev) => {
  ev.dataTransfer.setData('text/plain', ev.target.id);
  ev.dataTransfer.effectAllowed = 'move';
  ev.target.style.opacity = 0.5;

  ev.target.parentNode.id === 'watchlist'
    ? watchList.connectDroppable(ev.target)
    : favList.connectDroppable(ev.target);
};

const accountClickHandler = (ev) => {
  ACC_MODAL.style.display = 'block';
  ev.target.addEventListener('mouseleave', () => {
    ACC_MODAL.style.display = 'none';
  });
};


const watchList = new MovieList(WATCHLIST_EL, WATCHLIST_PLACEHOLDER);
const favList = new MovieList(FAVOURITES_EL, FAVOURITES_PLACEHOLDER);

LOGIN_BTN.addEventListener('click', accountClickHandler);
JOIN_BTN.addEventListener('click', accountClickHandler);

ADD_BTN.addEventListener('click', addBtnClickHandler);

WATCHLIST_EL.addEventListener('click', watchListClickHandler);
WATCHLIST_EL.addEventListener('dragstart', dragStartHandler);

FAVOURITES_EL.addEventListener('click', favListClickHandler);
FAVOURITES_EL.addEventListener('dragstart', dragStartHandler);
