import Movie from './movie.js';

const TITLE = document.querySelector('#title');
const DIRECTOR = document.querySelector('#director');
const COMMENT = document.querySelector('#comment');
const URL = document.querySelector('#url');

const FAVOURITES_EL = document.querySelector('#favourites');


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

  // Connect all movies with drop events.
  connectDroppable = (dragMov) => {
    const movies = this.listEl.querySelectorAll('.movie-card');

    for (let mov of movies) {
      mov.addEventListener('dragenter', function (ev) {
        ev.preventDefault();
      });

      mov.addEventListener('dragover', function (ev) {
        ev.preventDefault();
        if (mov != dragMov) {
          mov.classList = 'watch-movie-drag';
        }
      });

      mov.addEventListener('dragleave', function (ev) {
        ev.preventDefault();
        mov.classList = 'movie-card';
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
            : mov.parentNode.insertBefore(dropMov, mov);
        }
      });

      mov.addEventListener('dragend', function (ev) {
        movies.forEach((mov) => {
          mov.classList = 'movie-card';
          mov.style.opacity = 1;

          // Looking to clone each movie to remove event listeners. Doesnt seem to be clearing in the Performance tab (DevTools).
          // Tried returning the clonedMovie and mov.
          const clonedMovie = mov.cloneNode(true);
          mov.replaceWith(clonedMovie);
        });
      });
    }
  };
}

export default MovieList;
