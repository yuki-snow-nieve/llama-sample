document.addEventListener( 'DOMContentLoaded', () => {

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
