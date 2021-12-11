// === VARIABLES ===

let position = 0;
const slidesToScroll = 1;
const slidesToShow = 1;

const wrapper = document.querySelector('.wrapper');
const sliderItems = document.querySelectorAll('.slider-item');
const sliderTrack = document.querySelector('.slider-track');
const sliderContainer = document.querySelector('.slider-container');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');

const sliderItemsCount = sliderItems.length;

let slidesHided = 0;
let slidesLeft = sliderItemsCount - slidesToShow;
let slideWidth = window.getComputedStyle(sliderItems[0]).width.match(/\d*/)[0];

let touchStart = 'unclick';
let delPosition = 0;

// === / VARIABLES ===


// === BUTTONS ===

btnNext.addEventListener('click', () => {
  if (slidesLeft < slidesToScroll) {
    position -= Math.abs(slidesLeft * slideWidth);    
  } else {
    position -= Math.abs(slidesToScroll * slideWidth);
  }
    
  moveSlides();
  countSlides();
})

btnPrev.addEventListener('click', () => {
  if (slidesHided < slidesToScroll) {
    position += Math.abs(slidesHided * slideWidth);
  } else {
    position += Math.abs(slidesToScroll * slideWidth);
  }
    
  moveSlides();
  countSlides();
})

// === / BUTTONS ===


// === TOUCH ===

sliderContainer.addEventListener('mousedown', () => {
  touchStart = event.clientX;
})

sliderContainer.addEventListener('mousemove', () => {  
  if (touchStart != 'unclick') {    
    positionBySwipe(); 
  }
})

sliderContainer.addEventListener('mouseup', () => {  
  touchStart = 'unclick';  
  
  position += delPosition;
  
  
  correctPosition();
  countSlides();  
  moveSlides();  

  delPosition = 0;
})

// === / TOUCH ===


// === FUNCTIONS ===

function moveSlides() {
  sliderTrack.style.transform = `translateX(${position}px)`;
}

function countSlides() {
  slidesHided = Math.abs((position) / slideWidth);
  slidesLeft = sliderItemsCount - slidesToShow - slidesHided;
  
  btnPrev.disabled = (slidesHided == 0 ? true : false);
  btnNext.disabled = (slidesLeft == 0 ? true : false);

  console.log('Слайдов осталось:', slidesLeft, 'Слайдов прошли:', slidesHided, 'Позиция:', position);
}

function positionBySwipe() {
  touchCurrent = event.clientX;
  delPosition = touchCurrent - touchStart;

  sliderTrack.style.transform = `translateX(${(position + delPosition)}px)`;
}

function correctPosition() {
  console.log(position + delPosition, delPosition);

  

  if (Math.abs(delPosition) < slideWidth / 2) {

    position = -slidesHided * slideWidth;

  } else if (delPosition < - slideWidth / 2) {

    position = (slidesHided + 1) * -slideWidth;  

  } else if (delPosition > slideWidth / 2) {

    position = (slidesHided - 1) * -slideWidth;    

  }

  if (position > 0) {
    position = 0;
  } else if (position < -(sliderItemsCount - 1) * slideWidth) {
    position = -(sliderItemsCount - 1) * slideWidth;
  }
}

// === / FUNCTIONS ===