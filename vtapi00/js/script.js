//https://developer.mozilla.org/ja/docs/Web/API/View_Transition_API/Using
// window.addEventListener('pageswap', async (e) => {
//   console.log(e)
//   if (e.viewTransition) {

  

//   }
// })

// window.addEventListener("pagereveal", async (e) => {


// })


document.addEventListener( 'DOMContentLoaded', () => {

  let links = document.querySelectorAll('#listCanvas a')

  links.forEach(link => {
    
    link.addEventListener('click', (e) => {
      console.log(link.parentElement)

      link.parentElement.classList.add('is_active')

      // e.preventDefault()
    })

  });




  // gsap.utils.toArray(".movie-item").forEach(target => {
    gsap.config({
      force3D: true,
    });

    gsap.to('.test', {
      scale: 0.46,
      scrollTrigger: {
        trigger: '.test img', // アニメーション開始のトリガー要素
        start: 'top center-=20%', // アニメーション開始位置
        end: 'bottom center-=100px',
        toggleActions: 'play pause pause reverse',
        scrub: true,
        toggleClass: 'is_active',
        pin: true,
        pinSpacing: false,
        markers: true
      }
    });
  // });


})
