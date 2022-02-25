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

  export default Movie;