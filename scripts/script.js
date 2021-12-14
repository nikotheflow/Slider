// === VARIABLES ===

const slidesToScroll = 2;
const slidesToShow = 3;
const slideWidth = 100;
const slideDist = 10;

const wrapper = document.querySelector('.wrapper');
const sliderItems = document.querySelectorAll('.slider-item');
const sliderTrack = document.querySelector('.slider-track');
const sliderContainer = document.querySelector('.slider-container');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');

const root = document.documentElement;
const sliderItemsCount = sliderItems.length;

let position = 0;
let delPosition = 0;
let positionStart = 0;
let slidesHided = 0;
let slidesLeft = sliderItemsCount - slidesToShow;

// === / VARIABLES ===


// === COMMONS ===

setParameters();

// === / COMMONS ===


// === BUTTONS ===

btnNext.addEventListener('click', () => {
  if (slidesLeft < slidesToScroll) {
    position = -Math.abs((sliderItemsCount - slidesToShow) * (slideWidth + slideDist));
  } else {
    position -= Math.abs(slidesToScroll * (slideWidth + slideDist));
  }
    
  moveSlides();
  countSlides();
})

btnPrev.addEventListener('click', () => {
  if (slidesHided < slidesToScroll) {
    position = 0;
  } else {
    position += Math.abs(slidesToScroll * (slideWidth + slideDist));
  }
    
  moveSlides();
  countSlides();
})

// === / BUTTONS ===


// === SWIPE ===

sliderContainer.addEventListener('touchstart', touchStartSwipe);
sliderContainer.addEventListener('mousedown', mouseDownSwipe);

// === / SWIPE ===


// === FUNCTIONS ===
function setParameters() {
  root.style.setProperty('--slider-width', `${slideWidth * slidesToShow + slideDist * (slidesToShow - 1)}px`);
  root.style.setProperty('--slide-width', `${slideWidth}px`);
  root.style.setProperty('--slide-dist', `${slideDist}px`);
}

function moveSlides() {
  sliderTrack.style.transform = `translateX(${position}px)`;
  delPosition = 0;
}

function countSlides() {
  slidesHided = Math.abs(position / (slideWidth + slideDist));
  slidesLeft = sliderItemsCount - slidesToShow - slidesHided;
  
  btnPrev.disabled = (slidesHided == 0 ? true : false);
  btnNext.disabled = (slidesLeft == 0 ? true : false);

  console.log('Слайдов осталось:', slidesLeft, 'Слайдов прошли:', slidesHided, 'Позиция:', position);
}

function correctPosition() {
  if (delPosition < - slideWidth / 3) {
    position -= (slideWidth + slideDist) * -(Math.trunc(delPosition / slideWidth));
  } else if (delPosition > slideWidth / 3) {
    position += (slideWidth + slideDist) * (Math.trunc(delPosition / slideWidth));
  }
  
  if (position > 0) {
    position = 0;
  } else if (position < -(sliderItemsCount - slidesToShow) * (slideWidth + slideDist)) {
    position = -(sliderItemsCount - slidesToShow) * (slideWidth + slideDist);
  }
}

function mouseDownSwipe() {
  positionStart = event.clientX;

  sliderContainer.addEventListener('mousemove', mouseMoveSwipe);
  sliderContainer.addEventListener('mouseup', mouseUpSwipe);
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

  sliderContainer.removeEventListener('mousemove', mouseMoveSwipe);
  sliderContainer.removeEventListener('mouseup', mouseUpSwipe);
}

function touchStartSwipe() {
  event.preventDefault();
  positionStart = event.changedTouches[0].clientX;

  sliderContainer.addEventListener('touchmove', touchMoveSwipe);
  sliderContainer.addEventListener('touchend', touchEndSwipe);  
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

  sliderContainer.removeEventListener('touchmove', touchMoveSwipe);
  sliderContainer.removeEventListener('touchend', touchEndSwipe);  
}

// === / FUNCTIONS ===


