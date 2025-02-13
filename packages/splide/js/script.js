  document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.splide', {
      type: 'slide',
      direction: 'ttb',
      arrows: false,
      pagination: false,
      // autoplay: false,
      // lazyLoad: 'nearby',
      // rewind: false,
      // start: 1,
      perPage: 10,
      width: '100%',
      heightRatio: (9/16),
    } );

    splide.mount();
  } );
