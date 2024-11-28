document.addEventListener( 'DOMContentLoaded', () => {
  const movieDetailBox = document.getElementById('area_detail')

  const button_showDetail = document.getElementById('button-detail_show');
  const button_hideDetail = document.getElementById('button-detail_hide');


  const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    initialSlide: 1,
    slidesPerView: 'auto',
    effect: 'creative',
    creativeEffect: {
      limitProgress: 50,
      prev: {
        // translate: [ 横, 縦, 奥行]
        translate: ['-20vw', '-60%', '-10px'],
        // rotate: [横軸, 縦軸, 奥行軸]
        rotate: [0, 0, 0],
        scale: 0.8,
      },
      next: {
        // translate: [ 横, 縦, 奥行]
        translate: ['20vw', '60%', '-10px'],
        // rotate: [横軸, 縦軸, 奥行軸]
        rotate: [0, 0, 0],
        scale: 0.8,
      }
    },
    // history: {
    //   replaceState: true,
    //   key: ''
    // },
    centeredSlides: true,
    lazyPreloadPrevNext: 2,
    on: {
      activeIndexChange: (e) => {
      //   for (let i = 1; i < e.activeIndex + 1; i++) {
      //     e.slides[e.activeIndex - i].setAttribute('index', -1 * i)
      //   }
      //   for (let i = 0; i < 100; i++) {
      //     if (!e.slides[e.activeIndex + i].classList.contains('swiper-slide-visible')) {
      //       break;
      //     }
      //     e.slides[e.activeIndex + i].setAttribute('index', i)
      //   }
      },
      slideChangeTransitionStart: (e) => {
        deleteMovieInfo(e.slides[e.activeIndex - 1]);
        deletePlayerItem(e.slides[e.activeIndex - 1]);
      },
      slideChangeTransitionEnd: (e) => {
        setMovieInfo(e.slides[e.activeIndex]);
        startAutoPlay(e.slides[e.activeIndex]);
      }
    }
  });

  function deleteMovieInfo(item) {

  }

  function setMovieInfo(item) {

  }

  function deletePlayerItem(item) {
    const iframe = item.querySelector('iframe')
    if (iframe) { iframe.remove(); }
  }

  function startAutoPlay(item) {
    const player = document.createElement('iframe');
    player.setAttribute('width', '100%');
    player.setAttribute('height', '100%');
    player.setAttribute('src', item.dataset.movie + '&autoplay=1');
    player.setAttribute('title', '');
    player.setAttribute('frameborder', 0);
    player.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    player.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    player.setAttribute('allowfullscreen', '');

    setTimeout( () => {
      item.insertAdjacentElement('beforeend', player);
    }, 1000);
  }

  button_showDetail.addEventListener( 'click', () => {
    movieDetailBox.classList.add('is_active');
  })

  button_hideDetail.addEventListener( 'click', () => {
    movieDetailBox.classList.remove('is_active');
  })

});
