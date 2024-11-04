document.addEventListener( 'DOMContentLoaded', () => {
  const movieDetailBox = document.getElementById('box-detail');
  const toggleButton_showDetail = document.getElementById('button-showDetail_toggle');
  const button_hideDetail = document.getElementById('button-hideDetail');
  const areaDetail = document.getElementById('area_detail');
  let flg_showDetail = 0;

  const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    initialSlide: 1,
    slidesPerView: 'auto',
    effect: 'slide',
    speed: 400,
    // history: {
    //   replaceState: true,
    //   key: ''
    // },
    spaceBetween: 24,
    centeredSlides: false,
    centeredSlidesBounds: true,
    lazyPreloadPrevNext: 2,
    on: {
      slideNextTransitionStart: (e) => {
      },
      slidePrevTransitionStart: (e) => {
      },
      slideChangeTransitionStart: (e) => {
        deletePlayerItem(e.slides[e.snapIndex]);
        movieDetailBox.style.opacity = 0;
      },
      slideChangeTransitionEnd: (e) => {
        startAutoPlay(e.slides[e.snapIndex]);
        movieDetailBox.style.opacity = 1;
      }
    }
  });

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
    item.insertAdjacentElement('beforeend', player);
  };

  function deletePlayerItem(item) {
    if (!item.querySelector('iframe')) {
      return;
    }
    item.querySelector('iframe').remove();
  }

  toggleButton_showDetail.addEventListener('click', () => {
    if (flg_showDetail == 0) {
      openDetail();
    } else {
      closeDetail();
    }
  });

  button_hideDetail.addEventListener('click', () => {
    closeDetail();
  })

  function openDetail() {
    flg_showDetail = 1;
    areaDetail.classList.add('is_showmore');
    toggleButton_showDetail.textContent = '詳細を縮小する';
    button_hideDetail.style.display = 'block';
  }

  function closeDetail() {
    flg_showDetail = 0;
    areaDetail.classList.remove('is_showmore');
    toggleButton_showDetail.textContent = '詳細をもっと見る';
    button_hideDetail.style.display = 'none';
  }


});
