document.addEventListener( 'DOMContentLoaded', () => {
  const movieDetailBox = document.getElementById('box-detail');
  const toggleButton_showDetail = document.getElementById('button-showDetail_toggle');
  const button_hideDetail = document.getElementById('button-hideDetail');
  const areaDetail = document.getElementById('area_detail');
  const backThumbArea = document.getElementById('playerbackground');
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
        deletePlayerItem(e.slides[e.snapIndex - 1]);
      },
      slidePrevTransitionStart: (e) => {
        deletePlayerItem(e.slides[e.snapIndex + 1]);
      },
      slideChangeTransitionStart: () => {
        movieDetailBox.style.opacity = 0;
      },
      slideChangeTransitionEnd: (e) => {
        startAutoPlay(e.slides[e.snapIndex]);
        movieDetailBox.style.opacity = 1;
      }
    }
  });

  function startAutoPlay(item) {
    const thumb = item.querySelector('img');
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
    thumb.style.transition = 'opacity 1000ms ease-in-out';
    thumb.style.opacity = '0';

    const backThumb = document.createElement('img');
    backThumb.setAttribute('src', thumb.src);
    const backThumb2 = document.createElement('img');
    backThumb2.setAttribute('src', thumb.src);

    backThumbArea.insertAdjacentElement('beforeend', backThumb);
    backThumbArea.insertAdjacentElement('beforeend', backThumb2);
};

  function deletePlayerItem(item) {
    if (!item.querySelector('iframe')) {
      return;
    }
    const thumb = item.querySelector('img');
    thumb.style.transition = 'opacity 1000ms ease-in-out';
    thumb.style.opacity = '1';
    item.querySelector('iframe').remove();
    backThumbArea.querySelectorAll('img').forEach(imgelm => {
      imgelm.remove();
    });
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
