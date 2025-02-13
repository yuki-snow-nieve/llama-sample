document.addEventListener( 'DOMContentLoaded', () => {

  //pageの判定
  const currentUrl = location.pathname;

  function isHomePage(url){
    if (`${url}`.includes('/index')) {
      return true;
    }
    return false;
  }

  function isPlayerPage(url){
    if (`${url}`.includes('/player')) {
      return true;
    }
    return false;
  };

  //page transition
  let links = document.querySelectorAll('#listCanvas a')

  links.forEach(link => {
    
    link.addEventListener('click', (e) => {
      console.log(link.closest('.movie-list'))

      link.closest('.movie-list').classList.add('is_vt_wrapper')
      link.parentElement.classList.add('is_vt_item')

      // e.preventDefault()
    })

  });

  //index page
  if (isHomePage(currentUrl)) {
    homePage();
  }

  //player page
  if (isPlayerPage(currentUrl)) {
    playerPage();
  }

})

function homePage(){
  const globalHeader = document.getElementById('globalHeader');
  const globalHeaderHeight = globalHeader.offsetHeight;

  const listCanvas = document.getElementById('listCanvas');
  const swiperItems = document.querySelectorAll('.swiper-slide');
  let swiperItem = swiperItems[0];

  let swiperItemH = swiperItem.querySelector('.list-title').offsetHeight + swiperItem.querySelector('.movie-list').offsetHeight + swiperItem.querySelector('.list-safix').offsetHeight;

  const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    height: swiperItemH * (swiperItems.length - 1),
    initialSlide: 0,
    slidesPerView: 5,
    centeredSlides: true,
    effect: 'creative',
    speed: 300,
    creativeEffect: {
      limitProgress: 2,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        // translate: [ 横, 縦, 奥行]
        translate: [0, '-45%', '-60vw'],
        rotate: [20, 0, 0],
        scale: 0.8,
        origin: '0% 0%'
      },
      next: {
        translate: [0, '45%', '-60vw'],
        rotate: [-20, 0, 0],
        scale: 0.8,
        origin: '0% 100%'
      }
    },
    on: {
      init: (e) => {
        setVisibleSlideClass(e.slides, e.activeIndex)
        expandScrollableArea(swiperItemH, listCanvas);
        e.wrapperEl.style.transform = `translate3d(0, ${swiperItemH + globalHeaderHeight}px, 0)`;
      },
      slideNextTransitionStart: (e) => {
        // deleteMovieInfo(e.slides[e.activeIndex - 1]);
        // deletePlayerItem(e.slides[e.activeIndex - 1]);
      },
      slidePrevTransitionStart: (e) => {
        // deleteMovieInfo(e.slides[e.activeIndex + 1]);
        // deletePlayerItem(e.slides[e.activeIndex + 1]);
      },
      slideChangeTransitionStart: (e) => {
        e.slides.forEach(slide => {
          if (slide.classList.contains('swiper-slide-prev-prev')) {
            slide.classList.remove('swiper-slide-prev-prev')
          }
          if (slide.classList.contains('swiper-slide-next-next')) {
            slide.classList.remove('swiper-slide-next-next')
          }
        })
        setVisibleSlideClass(e.slides, e.activeIndex)
      }
    }
  });

  function setVisibleSlideClass(slides, activeIndex) {
    if (slides[activeIndex - 2]) {
      slides[activeIndex - 2].classList.add('swiper-slide-prev-prev')
    }
    if (slides[activeIndex + 2]) {
      slides[activeIndex + 2].classList.add('swiper-slide-next-next')
    }
  }

}


function playerPage(){
  const globalHeader = document.getElementById('globalHeader');
  const globalHeaderHeight = globalHeader.offsetHeight;

  const listCanvas = document.getElementById('listCanvas');
  let canvasW = listCanvas.offsetWidth;
  let swiperItemH = canvasW * 9 / 16;

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
        rotate: [0, 0, -45],
        scale: 0.46,
        opacity: 0.4
      },
      next: {
        translate: [0, '100%', 0],
        rotate: [0, 0, 45],
        scale: 0.46,
        opacity: 0.4
      }
    },
    on: {
      init: (e) => {
        // e.slides.forEach( slide => {
        //   // slide.style.height = swiperItemH;
        //   slide.style.height = 'fit-content';
        // });

        expandScrollableArea(swiperItemH, listCanvas);
        e.wrapperEl.style.transform = `translate3d(0, ${swiperItemH + globalHeaderHeight}px, 0)`;
      },
      slideNextTransitionStart: (e) => {
        // deleteMovieInfo(e.slides[e.activeIndex - 1]);
        // deletePlayerItem(e.slides[e.activeIndex - 1]);
      },
      slidePrevTransitionStart: (e) => {
        // deleteMovieInfo(e.slides[e.activeIndex + 1]);
        // deletePlayerItem(e.slides[e.activeIndex + 1]);
      },
      slideChangeTransitionEnd: (e) => {
        // setMovieInfo(e.slides[e.activeIndex]);
        // startAutoPlay(e.slides[e.activeIndex]);
      }
    }
  });


}

function expandScrollableArea(amount, canvas) {
  canvas.style.setProperty("--space-height", `${amount}px`); // css側でtopの値に入れるため、単位を含める
}
