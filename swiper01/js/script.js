document.addEventListener( 'DOMContentLoaded', () => {
  const movieDetailBox = document.getElementById('box-detail')

  const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    initialSlide: 1,
    slidesPerView: 'auto',
    effect: 'slide',
    // history: {
    //   replaceState: true,
    //   key: ''
    // },
    spaceBetween: 24,
    centeredSlides: false,
    centeredSlidesBounds: true,
    lazyPreloadPrevNext: 2,
    on: {
      slideChangeTransitionStart: () => {
        movieDetailBox.style.opacity = 0;
      },
      slideChangeTransitionEnd: () => {
        movieDetailBox.style.opacity = 1;
      }
    }
  });

});
