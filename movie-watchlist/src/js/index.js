'use strict';

const LOGIN_BTN = document.querySelector('#login-btn');
const JOIN_BTN = document.querySelector('#join-btn');
const ADD_BTN = document.querySelector('#add-btn');

const ACC_MODAL = document.querySelector('#account-modal');

const FORM = document.querySelector('form');
const TITLE = document.querySelector('#title');
const DIRECTOR = document.querySelector('#director');
const COMMENT = document.querySelector('#comment');
const URL = document.querySelector('#url');

const WATCH_RADIO = document.querySelector('#to-watch');
const FAV_RADIO = document.querySelector('#favourite');

const WATCHLIST_EL = document.querySelector('#watchlist');
const FAVOURITES_EL = document.querySelector('#favourites');
const WATCHLIST_PLACEHOLDER = document.querySelector('#watchlist-placeholder');
const FAVOURITES_PLACEHOLDER = document.querySelector(
  '#favourites-placeholder'
);

// Movie List class for Watchlist and Favourites
class MovieList {
  constructor(listEl, placeholder) {
    this.listEl = listEl;
    this.placeholder = placeholder;
    this.movies = [];
  }

  createMovie = () => {
    const movie = new Movie(
      TITLE.value,
      DIRECTOR.value,
      COMMENT.value,
      URL.value
    );
    this.movies.push(movie);
    this.renderNewMovie(movie);
  };

  switchMovie = (movie) => {
    this.movies.push(movie);
    this.renderNewMovie(movie);
  };

  renderNewMovie = (movie) => {
    if ((this.placeholder.style.display = 'block')) {
      this.placeholder.style.display = 'none';
    }
    const movieCard = document.createElement('div');
    movieCard.id = movie.ID;
    movieCard.classList = 'movie-card';
    movieCard.draggable = true;
    movieCard.innerHTML = movie.HTMLcontent;
    this.listEl.appendChild(movieCard);

    if (this.listEl == FAVOURITES_EL) {
      const favBtn = movieCard.querySelector('#fav-btn');
      favBtn.remove();
    }
  };

  // For when need to render all movies in list => user login.
  renderAllMovies = () => {
    this.placeholder.style.display = 'none';

    this.movies.forEach((movie) => {
      this.renderNewMovie(movie);
    });
  };

  // Connect all movies in a list with drag/drop events.
  connectDroppable = (dragMov) => {
    const movies = this.listEl.querySelectorAll('.movie-card');

    for (let mov of movies) {
      mov.addEventListener('dragenter', function (ev) {
        if (mov != dragMov) {
          mov.classList = 'watch-movie-drag';
        }
      });

      mov.addEventListener('dragleave', function (ev) {
        mov.classList = 'movie-card';
      });

      mov.addEventListener('dragend', function (ev) {
        for (let m of movies) {
          m.classList = 'movie-card';
          m.style.opacity = 1;
          clearEventListeners(m);
        }
      });

      mov.addEventListener('dragover', function (ev) {
        ev.preventDefault();
      });

      mov.addEventListener('drop', function (ev) {
        ev.preventDefault();
        
        const data = ev.dataTransfer.getData('text/plain');
        const dropMov = document.querySelector(`#${data}`);
        
        if (mov != dropMov) {
          let currPos = 0,
            dropPos = 0;
          for (let m = 0; m < movies.length; m++) {
            if (dropMov === movies[m]) {
              currPos = m;
            }
            if (mov === movies[m]) {
              dropPos = m;
            }
          }
          currPos < dropPos
            ? mov.parentNode.insertBefore(dropMov, mov.nextElementSibling)
            : mov.parentNode.insertBefore(dropMov, mov)
        }
      });
    }
  };
}

// Movie class for all generated movies
class Movie {
  constructor(title, director, comment, url) {
    this.ID = `${title.substring(0, 2).toUpperCase()}-${this.IDgen()}`;
    this.title = title;
    this.director = director;
    this.comment = comment;
    this.url = url;
    this.HTMLcontent = `
    <img
      class="w-full h-auto object-cover"
      src="${this.url}"
      alt="${this.title} Poster"
      draggable=false
      loading="lazy"
    />
    <div class="m-3 text-center h-24 overflow-scroll">
      <div class="flex-col med:flex justify-around">
        <button id="fav-btn" class="mb-2 px-4 py-1 rounded-full bg-yellow-300 border border-yellow-400 font-semibold shadow-inner active:bg-yellow-400 hover:bg-opacity-80" type="button">FAVOURITE</button>
        <button id="remove-btn" class="mb-2 px-6 py-1 ml-1 rounded-full bg-red-500 border border-red-600 font-semibold shadow-inner active:bg-red-600 hover:bg-opacity-90" type="button">REMOVE</button>
      </div>
      <span class="font-semibold md:font-bold md:text-lg"><h4>${this.title}</h4></span>
      <span class="font-semibold md:font-bold md:text-lg"><h4>${this.director}</h4></span>
      <span class="text-sm" contenteditable=true
        ><h4>
          ${this.comment}
        </h4></span
      >
    </div>
  </div>
    `;
  }

  IDgen = () => {
    return Math.random().toString(36).substring(2, 7);
  };
}

// Clear all event listeners for after the drag and drop. Deep clone and replace each movie element.
const clearEventListeners = (element) => {
  const clonedEl = element.cloneNode(true);
  element.replaceWith(clonedEl);
  return clonedEl;
};

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

// Start Drag/Drop passing target to respective list drop drop events.
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

// APP LOADS HERE

const watchList = new MovieList(WATCHLIST_EL, WATCHLIST_PLACEHOLDER);
const favList = new MovieList(FAVOURITES_EL, FAVOURITES_PLACEHOLDER);

LOGIN_BTN.addEventListener('click', accountClickHandler);
JOIN_BTN.addEventListener('click', accountClickHandler);

ADD_BTN.addEventListener('click', addBtnClickHandler);

WATCHLIST_EL.addEventListener('click', watchListClickHandler);
WATCHLIST_EL.addEventListener('dragstart', dragStartHandler);

FAVOURITES_EL.addEventListener('click', favListClickHandler);
FAVOURITES_EL.addEventListener('dragstart', dragStartHandler);
