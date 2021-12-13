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

let positionStart = 'unclick';
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


// === SWIPE ===

sliderContainer.addEventListener('touchstart', touchStartSwipe);
sliderContainer.addEventListener('touchmove', touchMoveSwipe);
sliderContainer.addEventListener('touchend', mouseUpSwipe);

sliderContainer.addEventListener('mousedown', mouseDownSwipe);
sliderContainer.addEventListener('mousemove', mouseMoveSwipe);
sliderContainer.addEventListener('mouseup', mouseUpSwipe);

// === / SWIPE ===


// === FUNCTIONS ===

function moveSlides() {
  sliderTrack.style.transform = `translateX(${position}px)`;
  delPosition = 0;
}

function countSlides() {
  slidesHided = Math.abs((position) / slideWidth);
  slidesLeft = sliderItemsCount - slidesToShow - slidesHided;
  
  btnPrev.disabled = (slidesHided == 0 ? true : false);
  btnNext.disabled = (slidesLeft == 0 ? true : false);

  console.log('Слайдов осталось:', slidesLeft, 'Слайдов прошли:', slidesHided, 'Позиция:', position);
}

function mouseMoveSwipe() {
  if (positionStart != 'unclick') {    
    positionCurrent = event.clientX;
    delPosition = positionCurrent - positionStart;

    sliderTrack.style.transform = `translateX(${(position + delPosition)}px)`;
  }
  
}

function correctPosition() {
  positionStart = 'unclick';  
  position += delPosition;  

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

function mouseDownSwipe() {
  console.log(event);
  positionStart = event.clientX;
}

function mouseUpSwipe() {
  correctPosition();
  countSlides();  
  moveSlides();
}

function touchStartSwipe() {
  event.preventDefault();
  positionStart = event.changedTouches[0].clientX;

}

function touchMoveSwipe() {
  if (positionStart != 'unclick') {    
    positionCurrent = event.changedTouches[0].clientX;
    delPosition = positionCurrent - positionStart;

    sliderTrack.style.transform = `translateX(${(position + delPosition)}px)`;
  }
}

// === / FUNCTIONS ===


