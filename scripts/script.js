let position = 0;
const slidesToScroll = 2;
const slidesToShow = 3;

const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const wrapper = document.querySelector('.wrapper');
const sliderItems = document.querySelectorAll('.slider-item');
const sliderTrack = document.querySelector('.slider-track');

const sliderItemsCount = sliderItems.length;

let slidesHided = 0;
let slidesLeft = sliderItemsCount - slidesToShow;
let slideWidth = window.getComputedStyle(sliderItems[0]).width.match(/\d*/)[0];

btnNext.addEventListener('click', () => {
  countSlides();
  
  if (slidesLeft < slidesToScroll) {
    position -= Math.abs(slidesLeft * slideWidth);
  } else {
    position -= Math.abs(slidesToScroll * slideWidth);
  }
  
  sliderTrack.style.transform = `translateX(${position}px)`; 
});

btnPrev.addEventListener('click', () => {
  countSlides();

  if (slidesHided < slidesToScroll) {
    position += Math.abs(slidesHided * slideWidth);
  } else {
    position += Math.abs(slidesToScroll * slideWidth);
  }
  
  sliderTrack.style.transform = `translateX(${position}px)`;
});

function countSlides() {
  slidesHided = Math.abs(position / slideWidth);
  slidesLeft = sliderItemsCount - slidesToShow - slidesHided;  
}