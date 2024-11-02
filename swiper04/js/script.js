document.addEventListener( 'DOMContentLoaded', () => {
  const player = document.getElementById('player');

  const swiperThumb = new Swiper('.swiper-thumbs', {
    direction: 'horizontal',
    loop: false,
    initialSlide: 0,
    slidesPerView: 'auto',
    effect: 'slide',
    // centeredSlides: true,
    spaceBetween: 8,
    // history: {
    //   replaceState: true,
    //   key: ''
    // },
    lazyPreloadPrevNext: 2,
    on: {
      init: (e) => {
        setPlayer(e.slides[e.snapIndex]);
      },
    //   slideChangeTransitionStart: () => {
    //     // movieDetailBox.style.opacity = 0;
    //   },
      slideChangeTransitionEnd: (e) => {
        // movieDetailBox.style.opacity = 1;
        setPlayer(e.slides[e.snapIndex]);
      }
    }
  });

  function setPlayer(item) {
    console.log(item.dataset.movie)
    player.querySelector('iframe').setAttribute('src', item.dataset.movie + '&rel=0&autoplay=1')

  }

});
