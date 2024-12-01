document.addEventListener( 'DOMContentLoaded', () => {
  const globalHeader = document.getElementById('globalHeader');
  const globalHeaderHeight = globalHeader.offsetHeight;

  const listCanvas = document.getElementById('listCanvas');
  const movies = document.getElementById('movies');
  const movieDetailBox = document.getElementById('area_detail');
  let movieDetailBoxHeight = movieDetailBox.offsetHeight;

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
      progressMultiplier: 0.6,
      prev: {
        // translate: [ 横, 縦, 奥行]
        translate: ['-20vw', '-80%', '-10px'],
        // rotate: [横軸, 縦軸, 奥行軸]
        scale: 0.8,
      },
      next: {
        // translate: [ 横, 縦, 奥行]
        translate: ['20vw', '80%', '-10px'],
        // rotate: [横軸, 縦軸, 奥行軸]
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
      init: () => {
        //リスト表示の上部部分にタッチ反応エリアを作る(疑似要素にサイズを与える)
        let amount = movies.querySelector('.swiper-slide-active').getBoundingClientRect().top - globalHeaderHeight;
        listCanvas.style.setProperty("--space-height", `${amount}px`); // css側でtopの値に入れるため、単位を含める
      },
      slideNextTransitionStart: (e) => {
        deletePlayerItem(e.slides[e.activeIndex - 1]);
      },
      slidePrevTransitionStart: (e) => {
        deletePlayerItem(e.slides[e.activeIndex + 1]);
      },
      slideChangeTransitionEnd: (e) => {
        setMovieInfoSize();
        startAutoPlay(e.slides[e.activeIndex]);
      }
    }
  });

  function setMovieInfoSize() {
    movieDetailBoxHeight = movieDetailBox.offsetHeight;
    movieDetailBox.style.height =  movieDetailBoxHeight;
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
    movieDetailBox.style.height =  window.innerHeight - globalHeaderHeight;
  })

  button_hideDetail.addEventListener( 'click', () => {
    movieDetailBox.classList.remove('is_active');
    movieDetailBox.style.height =  movieDetailBoxHeight;
  })

});
