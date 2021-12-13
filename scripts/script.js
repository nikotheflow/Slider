// === VARIABLES ===

let position = 0;
const slidesToScroll = 3;
const slidesToShow = 3;

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
let slideDistance = Number(window.getComputedStyle(sliderItems[0]).marginRight.match(/\d*/)[0]);

let positionStart = 'unclick';
let delPosition = 0;

// === / VARIABLES ===


// === COMMONS ===

setParameters(340);

// === / COMMONS ===


// === BUTTONS ===

btnNext.addEventListener('click', () => {
  if (slidesLeft < slidesToScroll) {
    position = -Math.abs((sliderItemsCount - slidesToShow) * slideWidth + (sliderItemsCount - slidesToShow) * slideDistance);
  } else {
    position -= Math.abs(slidesToScroll * (Number(slideWidth) + Number(slideDistance)));
  }
    
  moveSlides();
  countSlides();
})

btnPrev.addEventListener('click', () => {
  if (slidesHided < slidesToScroll) {
    position = 0;
  } else {
    position += Math.abs(slidesToScroll * (Number(slideWidth) + Number(slideDistance)));
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
function setParameters(wrapperWidth, slideWidth) {  
  console.log(wrapper.style.width = `${wrapperWidth}px`);
}

function moveSlides() {
  sliderTrack.style.transform = `translateX(${position}px)`;
  delPosition = 0;
}

function countSlides() {
  slidesHided = Math.abs(position / (Number(slideWidth) + Number(slideDistance)));
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

  if (Math.abs(delPosition) <= slideWidth / 3) {
    position = -slidesHided * (Number(slideWidth) + Number(slideDistance));
  } else if (delPosition < - slideWidth / 3) {
    position = (slidesHided + 1) * (-slideWidth - Number(slideDistance)) * slidesToScroll;
  } else if (delPosition > slideWidth / 3) {
    position = (slidesHided - 1) * (-slideWidth - Number(slideDistance)) ;
  }

  if (position > 0) {
    position = 0;
  } else if (position < -(sliderItemsCount - slidesToShow) * (Number(slideWidth) + Number(slideDistance))) {
    position = -(sliderItemsCount - slidesToShow) * (Number(slideWidth) + Number(slideDistance));
  }
}

function mouseDownSwipe() {
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


