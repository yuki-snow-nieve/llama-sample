document.addEventListener( 'DOMContentLoaded', () => {
  const movies = document.querySelectorAll(".movie-item");

  const observerOptions = {
    root: document.getElementById('box'),
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(doWhenIntersect, observerOptions);

  movies.forEach(movie => {
    observer.observe(movie);
  });

  function doWhenIntersect(entries) {
    console.log(entries)
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(entry.isIntersecting)
      }
    });
  }

});


// document.addEventListener( 'DOMContentLoaded', () => {
//   const activeMovieclassName = 'is_active';

//   const listMovies = document.getElementById('movies');
//   const movies = document.querySelectorAll(".movie-item");
//   const activeMovie = listMovies.querySelector(`.${activeMovieclassName}`);
//   const containerMovie = document.getElementById('box');
  
//   setPlayerPosition();

//   window.addEventListener("resize", () => {
//     setPlayerPosition();
//   });


//   const observerOptions = {
//     root: activeMovie,
//     rootMargin: '0px',
//     threshold: 0
//   };
  
//   const observer = new IntersectionObserver(doWhenIntersect, observerOptions);

//   function setPlayerPosition() {
//     let activeMovie = listMovies.querySelector(`.${activeMovieclassName}`);
//     const position = activeMovie.getBoundingClientRect();
//     containerMovie.style.position = 'absolute';
//     containerMovie.style.top = position.y;
//     containerMovie.style.height = position.height;
//     containerMovie.style.left = position.x;
//     containerMovie.style.width = position.eidth;
//   }

//   function doWhenIntersect(entries) {
//     console.log(entries)
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         console.log(entry.isIntersecting)
//       }
//     });
//   }

//   movies.forEach(movie => {
//     observer.observe(movie);
//   });


// });

