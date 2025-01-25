document.addEventListener( 'DOMContentLoaded', () => {

  const indexPage = document.getElementById('mainPage');
  const indexPage_listItem = indexPage.querySelectorAll('.movie-item');

  indexPage_listItem.forEach((item) => {
    // preventDefaultしちゃうと、アニメーションのbefore状態を保持しない？連続してくれない
    // item.addEventListener('click', (e) => {
      // e.preventDefault();
    //   item.classList.add('swiper-slide-active')
    //   const href = item.querySelector('a').getAttribute('href')
    //   console.log(href)

    //   setTimeout(() => {
    //     window.location.href = href
    //   }, 1000);
    // })

  
    item.addEventListener('click', (e) => {
      window.addEventListener("pageswap", (e) => {
      //   // window.alert('alle')
        item.classList.add('swiper-slide-active')
        item.previousElementSibling.classList.add('swiper-slide-prev')
        item.nextElementSibling.classList.add('swiper-slide-next')
      })
      console.log(item.previousElementSibling)
      console.log(item.nextElementSibling)
    })
    // item.addEventListener('click', (e) => {
    //   item.classList.add('swiper-slide-active')
    //   document.addEventListener('visibilitychange', () => {
    //     console.log(item)
    //   })
    //   console.log(item.classList)
    //   // e.preventDefault();
    //   // const href = item.querySelector('a').getAttribute('href')
    //   // console.log(href)
    // })
    // item.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   const href = item.querySelector('a').getAttribute('href')
    //   console.log(href)
    //   item.classList.add('swiper-slide-active')
    // })
  })
  
  

});
