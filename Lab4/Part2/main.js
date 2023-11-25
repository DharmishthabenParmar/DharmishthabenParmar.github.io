/* Creating an array of image file names */
const imageArray = ['images/pic1.jpg', 'images/pic2.jpg', 'images/pic3.jpg', 'images/pic4.jpg', 'images/pic5.jpg'];

/* Looping through images */
function loopingImg() {
    for (let i = 1; i <= imageArray.length; i++) {
      let newImage = document.createElement('img');
      let image = imageArray[i - 1]; // Adjusted index to start from 1
      newImage.setAttribute('src', image);
      document.querySelector('.thumb-bar').appendChild(newImage);
    }
}
/* Adding an event listener for the "click" event on all thumbnails */
function clickImg() {
    function setImgSrc() {
      let attribute = this.getAttribute('src'); // 'this' points to the clicked element
      let displayedImage = document.querySelector('.displayed-img');
      displayedImage.setAttribute('src', attribute);
    }
  
    let elements = document.querySelectorAll('.thumb-bar img'); // Selecting only the thumbnails
    elements.forEach(function (element) {
      element.addEventListener('click', setImgSrc);
    });
  }
  
  /* Handler to lighten/darken the button */
  function darkenImg() {
    let buttonNode = document.querySelector('.dark');
    let overlay = document.querySelector('.overlay');
  
    buttonNode.addEventListener('click', () => {
      const btnClass = buttonNode.getAttribute('class');
  
      if (btnClass === 'dark') {
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        buttonNode.setAttribute('class', 'light');
        buttonNode.textContent = 'Lighten';
      } else {
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
        buttonNode.setAttribute('class', 'dark');
        buttonNode.textContent = 'Darken';
      }
    });
  }
  
  
  document.addEventListener('DOMContentLoaded', (event) => {
    loopingImg();
    clickImg();
    darkenImg();
  });
  