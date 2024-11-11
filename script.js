document.addEventListener( 'DOMContentLoaded', () => {
  const dispW = document.getElementById('windowW');
  const dispH = document.getElementById('windowH');

  getWindowSize();

  window.addEventListener("resize", getWindowSize);

  function getWindowSize() {
    let w = window.outerWidth;
    let h = window.outerHeight;

    dispW.innerText = w + 'px';
    dispH.innerText = h + 'px';
  
  }
})
