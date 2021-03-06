document.querySelectorAll('.carousel').forEach(carousel => {
  var touchstartX = 0;
  var touchstartY = 0;
  var touchendX = 0;
  var touchendY = 0;

  carousel.addEventListener('touchstart', function(event) {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
  }, false);

  carousel.addEventListener('touchend', function(event) {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesture();
  }, false); 

  function handleGesture() {
      if (touchendX - touchstartX > 20) {
          showSlides(slideIndex -= 1);
      } else if (touchendX - touchstartX < -20) {
          showSlides(slideIndex += 1);
      }
  }

  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');

  prev.addEventListener('click', previousSlide);
  next.addEventListener('click', nextSlide);
  prev.addEventListener('touchStart', previousSlide);
  next.addEventListener('touchStart', nextSlide);

  const imageCount = carousel.querySelectorAll('.slide-box').length;
  const dotContainer = carousel.querySelector('.dot-container');

  console.log(imageCount);
  for(let i = 0; i < imageCount; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dotContainer.appendChild(dot);
    dot.dataset.index = i + 1;
    dot.addEventListener('click', handleDotClick);
  }

  var slideIndex = 1;
  showSlides(slideIndex);
  
  // Next/previous controls
  function previousSlide(event) {
    event.preventDefault();
    showSlides(slideIndex -= 1);
  }
  
  // Thumbnail image controls
  function nextSlide(event) {
    event.preventDefault();
    showSlides(slideIndex += 1);
  }

  function handleDotClick(event) {
    event.preventDefault();
    slideIndex = event.target.dataset.index;

    showSlides(slideIndex);
  }
  
  function showSlides(n) {
    var i;
    var slides = carousel.getElementsByClassName("slide-box");
    var dots = carousel.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }
});