document.addEventListener( 'DOMContentLoaded', () => {
  let w = window.innerWidth;
  let h = window.innerHeight;

  const dispW = document.getElementById('windowW');
  const dispH = document.getElementById('windowH');

  dispW.innerText = w + 'px'
  dispH.innerText = h + 'px'
})
