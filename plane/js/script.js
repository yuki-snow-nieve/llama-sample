document.addEventListener( 'DOMContentLoaded', () => {
  const activeMovieclassName = 'is_active';

  const listMovies = document.getElementById('movies');

  const changeActivePosition = (() => {
    const activeMovieBoundingBox = listMovies.querySelector(`.${activeMovieclassName}`).getBoundingClientRect();
    return activeMovieBoundingBox.y + activeMovieBoundingBox.height/2;
  })();

  listMovies.addEventListener('scroll', () => {
    const activeMovie = listMovies.querySelector(`.${activeMovieclassName}`);

    if ( activeMovie.getBoundingClientRect().y + activeMovie.getBoundingClientRect().height < changeActivePosition ) {
      activeMovie.classList.remove(activeMovieclassName);
      activeMovie.nextElementSibling.classList.add(activeMovieclassName);
    }

    if ( activeMovie.getBoundingClientRect().y > changeActivePosition) {
      activeMovie.classList.remove(activeMovieclassName);
      activeMovie.previousElementSibling.classList.add(activeMovieclassName);
    }
  });

});


// document.addEventListener( 'DOMContentLoaded', () => {
//   const activeMovieclassName = 'is_active';

//   const globalHeader = document.querySelector('header');
//   const listMovies = document.getElementById('Movies');
//   let activeMovie = listMovies.querySelector(`.${activeMovieclassName}`);

//   function get_positions() {
//     const globalHeaderHeight = globalHeader.getBoundingClientRect().height
//     const activeMovieHeight = activeMovie.getBoundingClientRect().height
//     const resizeMoviePoint = activeMovie.getBoundingClientRect().y + activeMovieHeight/2;

//     const offsetChangeActiveMovie = activeMovie.nextElementSibling.getBoundingClientRect().height/2;
//     const resizeNextMoviePoint = activeMovie.getBoundingClientRect().y - offsetChangeActiveMovie;
//     const resizePrevMoviePoint = activeMovie.getBoundingClientRect().y + activeMovie.getBoundingClientRect().height + offsetChangeActiveMovie;

//     return {
//       'globalHeaderHeight': globalHeaderHeight,
//       'activeMovieHeight': activeMovieHeight,
//       'resizeMoviePoint': resizeMoviePoint,
//       'resizeNextMoviePoint': resizeNextMoviePoint,
//       'resizePrevMoviePoint': resizePrevMoviePoint
//     };
//   }

//   let getPositions = get_positions();

//   window.addEventListener("resize", () => {
//     let get_positions = get_positions();
//   });

//   listMovies.addEventListener('scroll', () => {
//     const activeMovie = listMovies.querySelector(`.${activeMovieclassName}`);

//     console.log(activeMovie)

//     if ( activeMovie.getBoundingClientRect().y < getPositions.resizePrevMoviePoint ) {
//       activeMovie.classList.remove(activeMovieclassName);
//       activeMovie.nextElementSibling.classList.add(activeMovieclassName)
//     }

//     // if (activeMovie.getBoundingClientRect().y + activeMovie.getBoundingClientRect().height > getPositions.resizeNextMoviePoint ) {
//     //   activeMovie.previousElementSibling.classList.add(activeMovieclassName)
//     //   activeMovie.classList.remove(activeMovieclassName);
//     // }


//   });
// })
