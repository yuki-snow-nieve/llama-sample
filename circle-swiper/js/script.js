document.addEventListener( 'DOMContentLoaded', () => {

  const listCanvas = document.getElementById('listCanvas');
  let canvasW = listCanvas.offsetWidth;
  let swiperItemH = canvasW * 9 / 16;

  const button_hideDetail = document.getElementById('button-hideDetail');
  const box_detail = document.getElementById('box_detail');

  const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    height: swiperItemH * 3,
    initialSlide: 1,
    slidesPerView: 3,
    effect: 'creative',
    virtualTranslate: true,
    speed: 300,
    // history: {
    //   replaceState: true,
    //   key: ''
    // },
    lazyPreloadPrevNext: 2,
    creativeEffect: {
      limitProgress: 1,
      perspective: false,
      prev: {
        // translate: [ 横, 縦, 奥行]
        translate: [0, '-100%', 0],
        // rotate: [横軸, 縦軸, 奥行軸]
        rotate: [0, 0, -30],
        scale: 0.4,
        opacity: 0.4
      },
      next: {
        translate: [0, '100%', 0],
        rotate: [0, 0, 30],
        scale: 0.4,
        opacity: 0.4
      }
    },
    on: {
      init: (e) => {
        e.slides.forEach( slide => {
          slide.style.height = swiperItemH;
        });
        e.wrapperEl.style.transform = `translate3d(0, ${swiperItemH}px, 0)`;
      },
      slideNextTransitionStart: (e) => {
        deleteMovieInfo(e.slides[e.activeIndex - 1]);
        deletePlayerItem(e.slides[e.activeIndex - 1]);
      },
      slidePrevTransitionStart: (e) => {
        deleteMovieInfo(e.slides[e.activeIndex + 1]);
        deletePlayerItem(e.slides[e.activeIndex + 1]);
      },
      slideChangeTransitionEnd: (e) => {
        setMovieInfo(e.slides[e.activeIndex]);
        startAutoPlay(e.slides[e.activeIndex]);
    //     // startAutoPlay(e.slides[e.snapIndex]);
      }
    }
  });

  function setMovieInfo(item) {
    const titleHTML = '<h1 class="movie-item-header movie-title">作品タイトル作品タイトル作品タイトル作品タイトル</h1>';
    const reactionButtons = `
      <div class="buttons-reaction">
        <button>★</button>
        <button>！</button>
        <button>？</button>
      </div>
    `;
    const showDetailButton = '<button id="button-showDetail" class="button-detail_show button_border">作品詳細を見る</button>'
    item.insertAdjacentHTML('beforeend', titleHTML);
    item.insertAdjacentHTML('beforeend', `<footer class="movie-item-footer">${reactionButtons}${showDetailButton}</footer>`);
  }

  function deleteMovieInfo(item) {
    const title = item.querySelector('h1');
    const footer = item.querySelector('footer');

    if (title) { title.remove() }
    if (footer) { footer.remove() }
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
  };

  function deletePlayerItem(item) {
    const iframe = item.querySelector('iframe')
    if (iframe) { iframe.remove(); }
  }

  listCanvas.addEventListener('click', (e) => {
    if(e.target.id === 'button-showDetail') {
      console.log(box_detail.classList)
      box_detail.classList.add('is_active');
    }
  })

  button_hideDetail.addEventListener( 'click', () => {
    box_detail.classList.remove('is_active');
  })

});
