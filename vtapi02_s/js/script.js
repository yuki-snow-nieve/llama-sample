document.addEventListener( 'DOMContentLoaded', () => {

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

  let links = document.querySelectorAll('#listCanvas a')

  // view transition api
  links.forEach(link => {
    
    link.addEventListener('click', (e) => {

      link.closest('.list-wrapper').classList.add('is_vt_wrapper')
      link.closest('.movie-list').classList.add('is_vt_box')
      link.closest('.movie-item').classList.add('is_vt_item')

      // console.log(document.querySelectorAll('.is_vt_wrapper'))
      // console.log(document.querySelectorAll('.is_vt_box'))
      // console.log(document.querySelectorAll('.is_vt_item'))
      // e.preventDefault()
    })

  });

  //index
  if (isHomePage(currentUrl)) {
    homePage();
  }

  //player
  if (isPlayerPage(currentUrl)) {
    playerPage();
  }

})

function homePage(){
  const globalHeader = document.getElementById('globalHeader');
  const globalHeaderHeight = globalHeader.offsetHeight;

  const listCanvas = document.getElementById('listCanvas');

  listCanvas.style.paddingTop = `${window.innerHeight/2 + globalHeaderHeight - window.innerWidth * 9/(16 * 2)}px`;



  //gsap
  gsap.registerPlugin(ScrollTrigger);
  
  // const pickupItems = document.querySelector('.box-pickup').querySelectorAll('.movie-item');
  const featureLists = gsap.utils.toArray('.box-feature');
  const featureListsItems = gsap.utils.toArray('.box-feature .movie-item');
  let featureListsItems_h = featureListsItems[0].offsetHeight;


  featureLists.forEach(el => {
    gsap.set(el, {
      y: featureListsItems_h * 2/3,
      z: -200,
      alpha: 0.4
    });

    //toActive
    gsap.to(el, 
      {
        y:0,
        z: 0,
        alpha: 1,
        // ease: 'circ.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          end: 'top 50%',
          scrub: true,
          markers: true
        }
      }
    )


    gsap.to(el, 
      {
        y: -1 * featureListsItems_h * 2/3,
        z: -200,
        alpha: 0.4,
        // ease: 'circ.out',
        scrollTrigger: {
          trigger: el,
          start: 'bottom 50%',
          end: 'bottom 25%',
          scrub: true,
          markers: true
        }
      }
    )

    // gsap.from(el, {
    //   y: 0,
    //   z: -100,
    //   ease: "power2.in",
    //   scrollTrigger:
    //   {
    //     trigger: el,
    //     start:'top 50%',
    //     end: 'bottom 50%',
    //     toggleActions: 'play reverse play reverse',
    //     markers: true,
    //     onEnter: (self) => {
    //       console.log(self.trigger)
    //       self.trigger.transformOrigin = '0% 50%';
    //     },
    //     onEnterBack: (self) => {
    //       console.log(self.trigger)
    //       self.trigger.transformOrigin = '100% 50%';
    //     },
    //     onLeave: (self) => {
    //       console.log(self.trigger)
    //       self.trigger.transformOrigin = '100% 50%';
    //     },
    //     onLeaveBack: (self) => {
    //       console.log(self.trigger)
    //       self.trigger.transformOrigin = '0% 50%';
    //     }
    //   }
    // });
  });

  // featureListsItems.forEach(el => {
  //   gsap.from(el, {
  //     width: `${56 * 0.4}vw`, 
  //     autoAlpha: 0.4,
  //     ease: "power2.in",
  //     scrollTrigger:
  //     {
  //       trigger: el,
  //       start:'top 75%',
  //       end: 'bottom 25%',
  //       toggleActions: 'play reverse play reverse',
  //       markers:true,
  //     }
  //   });
  // });




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
