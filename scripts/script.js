// === VARIABLES ===

const container = document.querySelector('.container');
const sliderItems = document.querySelectorAll('.slider-item');
const sliderTrack = document.querySelector('.slider-track');
const sliderContainer = document.querySelector('.slider-container');
const btnMainNext = document.querySelector('.btn-main_next');
const btnMainPrev = document.querySelector('.btn-main_prev');
const btnSideNext = document.querySelector('.btn-side_next');
const btnSidePrev = document.querySelector('.btn-side_prev');

const sliderItemsCount = sliderItems.length;

let slideWidth = +window.getComputedStyle(sliderItems[0]).minWidth.match(/\d*/)[0];
let slideDist = +window.getComputedStyle(sliderItems[0]).marginRight.match(/\d*/)[0];
let sliderWidth = +window.getComputedStyle(sliderContainer).width.match(/\d*/)[0];

let slidesToScroll = 3;
let slidesToShow = 3;
let scrollCoef = 1.5;
let position = 0;
let delPosition = 0;
let positionStart = 0;
let slidesHided = 0;
let slidesLeft = sliderItemsCount - slidesToShow;

// === / VARIABLES ===


// === COMMONS ===

setParameters();
getParameters();

window.addEventListener('resize', () => {
  setParameters();
  getParameters();

  position = 0;
  moveSlides();
  
  countSlides();
});

// === / COMMONS ===


// === BUTTONS ===

btnMainNext.addEventListener('click', clickNextButton)
btnMainPrev.addEventListener('click', clickPrevButton)

btnSideNext.addEventListener('click', clickNextButton)
btnSidePrev.addEventListener('click', clickPrevButton)
btnSideNext.addEventListener('touchstart', clickNextButton)
btnSidePrev.addEventListener('touchstart', clickPrevButton)

// === / BUTTONS ===


// === SWIPE ===

container.addEventListener('touchstart', touchStartSwipe);
container.addEventListener('mousedown', mouseDownSwipe);

// === / SWIPE ===


// === FUNCTIONS ===

function setParameters() {
  if (window.innerWidth <= 480) {
    slidesToScroll = 1;
    slidesToShow = 1;
    scrollCoef = 2.5;
  } else {
    slidesToScroll = 3;
    slidesToShow = 3;
    scrollCoef = 1.5;
  }
}

function getParameters() {
  slideWidth = +window.getComputedStyle(sliderItems[0]).minWidth.match(/\d*/)[0];
  slideDist = +window.getComputedStyle(sliderItems[0]).marginRight.match(/\d*/)[0];
  sliderWidth = +window.getComputedStyle(sliderContainer).width.match(/\d*/)[0];
}

function moveSlides() {
  sliderTrack.style.transform = `translateX(${position}px)`;
  delPosition = 0;
}

function countSlides() {
  slidesHided = Math.abs(position / (slideWidth + slideDist));
  slidesLeft = sliderItemsCount - slidesToShow - slidesHided;
  
  btnMainPrev.disabled = (slidesHided == 0 ? true : false);
  btnSidePrev.disabled = (slidesHided == 0 ? true : false);
  
  btnMainNext.disabled = (slidesLeft == 0 ? true : false);
  btnSideNext.disabled = (slidesLeft == 0 ? true : false);

  console.log('Слайдов осталось:', slidesLeft, 'Слайдов прошли:', slidesHided, 'Позиция:', position);
}

function correctPosition() {
  if (delPosition < - slideWidth / 3) {
    position -= (slideWidth + slideDist) * -(Math.trunc(scrollCoef * delPosition / slideWidth));
  } else if (delPosition > slideWidth / 3) {
    position += (slideWidth + slideDist) * (Math.trunc(scrollCoef * delPosition / slideWidth));
  }
  
  if (position > 0) {
    position = 0;
  } else if (position < -(sliderItemsCount - slidesToShow) * (slideWidth + slideDist)) {
    position = -(sliderItemsCount - slidesToShow) * (slideWidth + slideDist);
  }
}

function clickNextButton() {
  if (slidesLeft < slidesToScroll) {
    position = -Math.abs((sliderItemsCount - slidesToShow) * (slideWidth + slideDist));
  } else {
    position -= Math.abs(slidesToScroll * (slideWidth + slideDist));
  }
    
  moveSlides();
  countSlides();
}

function clickPrevButton() {
  if (slidesHided < slidesToScroll) {
    position = 0;
  } else {
    position += Math.abs(slidesToScroll * (slideWidth + slideDist));
  }
    
  moveSlides();
  countSlides();
}

function mouseDownSwipe() {
  console.log('але')
  event.preventDefault();
  positionStart = event.clientX;

  document.addEventListener('mousemove', mouseMoveSwipe);
  document .addEventListener('mouseup', mouseUpSwipe);
}

function mouseMoveSwipe() {
  event.preventDefault();   
  positionCurrent = event.clientX;
  delPosition = positionCurrent - positionStart;

  sliderTrack.style.transform = `translateX(${(position + delPosition)}px)`;
}

function mouseUpSwipe() {
  correctPosition();
  countSlides();  
  moveSlides();

  document.removeEventListener('mousemove', mouseMoveSwipe);
  document.removeEventListener('mouseup', mouseUpSwipe);
}

function touchStartSwipe() {
  event.preventDefault();
  positionStart = event.changedTouches[0].clientX;

  document.addEventListener('touchmove', touchMoveSwipe);
  document.addEventListener('touchend', touchEndSwipe);  
}

function touchMoveSwipe() {  
  positionCurrent = event.changedTouches[0].clientX;
  delPosition = positionCurrent - positionStart;

  sliderTrack.style.transform = `translateX(${(position + delPosition)}px)`;
}

function touchEndSwipe() {
  correctPosition();
  countSlides();  
  moveSlides();

  document.removeEventListener('touchmove', touchMoveSwipe);
  document.removeEventListener('touchend', touchEndSwipe);  
}

// === / FUNCTIONS ===


