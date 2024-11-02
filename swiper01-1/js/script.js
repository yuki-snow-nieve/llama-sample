document.addEventListener( 'DOMContentLoaded', () => {
  const movieDetailBox = document.getElementById('box-detail')
  const backThumbArea = document.getElementById('playerbackground');

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
      slideNextTransitionStart: (e) => {
        deletePlayerItem(e.slides[e.snapIndex - 1]);
      },
      slidePrevTransitionStart: (e) => {
        deletePlayerItem(e.slides[e.snapIndex + 1]);
      },
      slideChangeTransitionEnd: (e) => {
        movieDetailBox.style.opacity = 1;
        startAutoPlay(e.slides[e.snapIndex]);
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
    backThumbArea.insertAdjacentElement('afterbegin', backThumb)
  };

  function deletePlayerItem(item) {
    console.log(item.querySelector('iframe'))
    console.log(backThumbArea)
    if (!item.querySelector('iframe')) {
      return;
    }
    const thumb = item.querySelector('img');
    thumb.style.transition = 'opacity 1000ms ease-in-out';
    thumb.style.opacity = '1';
    item.querySelector('iframe').remove();
    backThumbArea.querySelector('img').remove();
  }
});
