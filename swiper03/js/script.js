document.addEventListener( 'DOMContentLoaded', () => {
  const movieDetailBox = document.getElementById('box-detail')

  const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    initialSlide: 1,
    slidesPerView: 'auto',
    effect: 'slide',
    // coverflowEffect: {
    //   depth: 50,
    //   modifier: 1,
    //   rotate: 46,
    //   scale: 0.5
    // },
    // spaceBetween: -160,
    // history: {
    //   replaceState: true,
    //   key: ''
    // },
    centeredSlides: true,
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
