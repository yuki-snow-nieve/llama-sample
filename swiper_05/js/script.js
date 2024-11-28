document.addEventListener( 'DOMContentLoaded', () => {
  const movieDetailBox = document.getElementById('box-detail')

  const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    initialSlide: 1,
    slidesPerView: 'auto',
    effect: 'coverflow',
    coverflowEffect: {
      depth: 50,
      modifier: 1,
      rotate: 46,
      scale: 0.5
    },
    spaceBetween: -160,
    // fadeEffect: {},
    // flipEffect: {},
    // history: {
    //   replaceState: true,
    //   key: ''
    // },
    centeredSlides: true,
    lazyPreloadPrevNext: 2,
    on: {
      activeIndexChange: (e) => {
        for (let i = 1; i < e.activeIndex + 1; i++) {
          e.slides[e.activeIndex - i].setAttribute('index', -1 * i)
        }
        for (let i = 0; i < 100; i++) {
          if (!e.slides[e.activeIndex + i].classList.contains('swiper-slide-visible')) {
            break;
          }
          e.slides[e.activeIndex + i].setAttribute('index', i)
        }
      },
      slideChangeTransitionStart: () => {
        movieDetailBox.style.opacity = 0;
      },
      slideChangeTransitionEnd: () => {
        movieDetailBox.style.opacity = 1;
      }
    }
  });

});
