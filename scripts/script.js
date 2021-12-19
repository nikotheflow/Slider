// === VARIABLES ===

const container = document.querySelector('.container');
const task = document.querySelector('.task');
const sliderItems = document.querySelectorAll('.slider-item');
const sliderTrack = document.querySelector('.slider-track');
const sliderContainer = document.querySelector('.slider-container');
const btnsMain = document.querySelector('.slider-main-btns');
const btnMainNext = document.querySelector('.btn-main_next');
const btnMainPrev = document.querySelector('.btn-main_prev');
const btnsSide = document.querySelector('.slider-side-btns');
const btnSideNext = document.querySelector('.btn-side_next');
const btnSidePrev = document.querySelector('.btn-side_prev');
const btnSlide = document.querySelector('.btn-slider-link');

const sliderItemsCount = sliderItems.length;

let slideWidth = +window.getComputedStyle(sliderItems[0]).minWidth.match(/\d*/)[0];
let slideDist = +window.getComputedStyle(sliderItems[0]).marginRight.match(/\d*/)[0];
let sliderWidth = +window.getComputedStyle(sliderContainer).width.match(/\d*/)[0];

let slidesToScroll = 3;
let slidesToShow = 3;
let scrollCoef = 1.3;
let position = 0;
let delPosition = 0;
let positionStart = 0;
let slidesHided = 0;
let slidesLeft = sliderItemsCount - slidesToShow;

let isClick = false;
let isTouch = false;

let version = localStorage.getItem('version');
let stats = {
  first: null,
  last: null,
  main: 0,
  side: 0,
  swipe: 0,
};

// === / VARIABLES ===


// === COMMONS ===

setVersion();
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


// === HANDLERS ===

//buttons
btnMainNext.addEventListener('click', clickNextButton)
btnMainPrev.addEventListener('click', clickPrevButton)

btnSideNext.addEventListener('click', clickNextButton)
btnSidePrev.addEventListener('click', clickPrevButton)
btnSideNext.addEventListener('touchstart', clickNextButton)
btnSidePrev.addEventListener('touchstart', clickPrevButton)

//swipe
btnSlide.addEventListener('mousedown', () => {  
  positionStart = event.clientX;

  document.addEventListener('mousemove', slideClickMove(event));
  document.addEventListener('mouseup', slideClickEnd);
})

btnSlide.addEventListener('touchstart', () => {
  event.preventDefault();
  positionStart = event.changedTouches[0].clientX;

  document.addEventListener('touchmove', slideClickMove(event.changedTouches[0]));
  document.addEventListener('touchend', slideClickEnd);
})

//swipe on goal item
container.addEventListener('touchstart', touchStartSwipe);
container.addEventListener('mousedown', mouseDownSwipe);

// === / HANDLERS ===


// === FUNCTIONS ===

//three versions of slider: 1.main buttons only, 2.side buttons only, 3.main and side buttons
function setVersion() {
  if (version == null) {
    version = Math.floor(Math.random() * 3) + 1;
    localStorage.setItem('version', version);
  }

  if (version == 1) {
    btnsMain.style.display = 'flex';
  } else if (version == 2) {
    btnsSide.style.display = 'flex';
  } else if (version == 3) {
    btnsMain.style.display = 'flex';
    btnsSide.style.display = 'flex';
  }
}

function setParameters() {
  if (window.innerWidth <= 480) {
    slidesToScroll = 1;
    slidesToShow = 1;
    scrollCoef = 2.5;
  } else {
    slidesToScroll = 3;
    slidesToShow = 3;
    scrollCoef = 1.3;
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

  //console.log('Слайдов осталось:', slidesLeft, 'Слайдов прошли:', slidesHided, 'Позиция:', position);
}

function correctPosition() {
  if (delPosition < - slideWidth / 3) {
    position -= (slideWidth + slideDist) * -(Math.trunc(scrollCoef * delPosition / slideWidth));
    addStat('swipe');
  } else if (delPosition > slideWidth / 3) {
    position += (slideWidth + slideDist) * (Math.trunc(scrollCoef * delPosition / slideWidth));
    addStat('swipe');
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

  addStat(this.name);
}

function clickPrevButton() {
  if (slidesHided < slidesToScroll) {
    position = 0;
  } else {
    position += Math.abs(slidesToScroll * (slideWidth + slideDist));
  }
    
  moveSlides();
  countSlides();

  addStat(this.name);
}

function mouseDownSwipe() {
  isTouch = false;
  isClick = true;

  event.preventDefault();
  positionStart = event.clientX; 

  document.addEventListener('mousemove', mouseMoveSwipe);
  document.addEventListener('mouseup', mouseUpSwipe);
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
  isTouch = true;
  isClick = false;

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

function slideClickMove(ev) {
  positionCurrent = ev.clientX;
  delPosition = positionCurrent - positionStart;
}

function slideClickEnd() {
  if (!delPosition) {
    send();

    task.innerHTML = 'Спасибо!';
    container.style.display = 'none';
    btnsMain.style.display = 'none';
  }
  
  if (isTouch) {
    document.removeEventListener('touchmove', slideClickMove(event.changedTouches[0]));
    document.removeEventListener('touchend', slideClickEnd);
  } else {
    document.removeEventListener('mousemove', slideClickMove(event));
    document.removeEventListener('mouseup', slideClickEnd);
  }  
}

function addStat(action) {
  if (stats.first == null) {
    stats.first = action;
  }

  stats.last = action;
  stats[action] += 1;
}

//yandex metrika and google analytics goals
function addGoal(action) {
  ym(86929511, 'reachGoal', action);
  gtag('event', action);
}

function send() {
  //send to csv
  let xhr = new XMLHttpRequest();
  let post = new FormData();
  
  xhr.open('POST', 'https://21nikitenko.lavro.ru/save_goal.php');
  
  post.append('version', version);
  post.append('first', stats.first);
  post.append('last', stats.last);
  post.append('main', stats.main);
  post.append('side', stats.side);
  post.append('swipe', stats.swipe);

  xhr.send(post);
  
  // send to yandex metrika and google analytics
  ['main', 'side', 'swipe'].forEach((action) => {
    if (stats[action] != 0) {
      addGoal(action);
    }  
  })

  //console.log(stats);
}

// === / FUNCTIONS ===


