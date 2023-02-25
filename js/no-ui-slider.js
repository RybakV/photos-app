let filterName = 'none';
let filterValue = 100;
let filterValueCss = '';
const filterMin = 0;
const filterMax = 100;
let filterSteps = 10;
const submitImageForm = document.querySelector('#upload-select-image');
const filterSlider = document.querySelector('#slider');
const effectsParent = document.querySelector('.effects__list');
const sliderValueInput = document.querySelector('.effect-level__value');
const largeImage = document.querySelector('.img-upload__preview img');

export function createSlider() {
  filterSlider.classList.add('hidden');

  noUiSlider.create(filterSlider, {
    start: [filterMax],
    animate: true,
    connect: 'lower',
    step: 10,
    tooltips: true,
    format: {
      to: function (value) {
        return value.toFixed(0) + '%';
      },
      from: function (value) {
        return Number(value.replace('%', ''));
      }
    },
    range: {
      'min': filterMin,
      'max': filterMax
    }
  });

  calculateFilterValue(filterName, filterMax);
  filterSlider.noUiSlider.on('update', function (values, handle) {
    filterValue = values[handle];
    calculateFilterValue(filterName, filterValue);

    console.log(filterValue);
    largeImage.style.filter = filterValueCss;
    sliderValueInput.setAttribute('value', filterValueCss);
  });
}

effectsParent.addEventListener('click', updateSlider);
function updateSlider(event){
  let target = event.target.closest('label');
  if (target.classList.contains('effects__label')) {
    filterName = target.getAttribute('for').replace('effect-', '');
  }
  if (filterName === 'none') {
    filterSlider.classList.add('hidden');
  }
  else {
    filterSlider.classList.remove('hidden');
  }
  calculateFilterSteps(filterName);
  setSteps(filterSteps);
  filterSlider.noUiSlider.set(filterMax);
  sliderValueInput.setAttribute('value', filterValueCss);
}

function calculateFilterSteps(effectName){
  switch (effectName) {
    case 'chrome':
      filterSteps = 10;
      break;
    case 'sepia':
      filterSteps = 10;
      break;
    case 'marvin':
      filterSteps = 100;
      break;
    case 'phobos':
      filterSteps = 30;
      break;
    case 'heat':
      filterSteps = 20;
      break;
  }
}

function calculateFilterValue(effectName, opacity){
  switch (effectName) {
    case 'none':
      filterValueCss = ``;
      break;
    case 'chrome':
      filterValueCss = `grayscale(${opacity})`;
      break;
    case 'sepia':
      filterValueCss = `sepia(${opacity})`;
      break;
    case 'marvin':
      filterValueCss = `invert(${opacity})`;
      break;
    case 'phobos':
      filterValueCss = `blur(${Number(opacity.replace('%', ''))*0.3}px)`;
      break;
    case 'heat':
      filterValueCss = `brightness(${Number(opacity.replace('%', ''))*0.02+1})`;
      break;
  }
}

function setSteps(quantity){
  filterSlider.noUiSlider.updateOptions({
    step: filterMax/quantity,
  });
}

// Zoom feature logic
const scaleControls = document.querySelector('.img-upload__scale');
const scaleValueInput = document.querySelector('.scale__control--value');
let scaleLevel = 1;
const scaleLevelMin = 0.25;
const scaleLevelMax = 1.5;
const scaleStep = 0.25;
let scaleLevelPercent = '100%';

export function uploadImageZoom(){
  scaleControls.addEventListener('click', scaleImage);
  function scaleImage(event) {
    let target = event.target;
    if (target.classList.contains('scale__control--smaller')) {
      if (scaleLevel > scaleLevelMin) {
        scaleLevel = scaleLevel - scaleStep;
        largeImage.style.transform = `scale(${scaleLevel})`;
        scaleLevelPercent = `${scaleLevel*100}%`
        scaleValueInput.setAttribute('value', scaleLevelPercent);
      }
    }
    else if (target.classList.contains('scale__control--bigger')) {
      if (scaleLevel < scaleLevelMax) {
        scaleLevel = scaleLevel + scaleStep;
        largeImage.style.transform = `scale(${scaleLevel})`;
        largeImage.style.opacity = scaleLevel;
        scaleLevelPercent = `${scaleLevel*100}%`
        scaleValueInput.setAttribute('value', scaleLevelPercent);
      }
    }
  }
}

//Form submit logic
submitImageForm.addEventListener("submit", formSubmit);
function formSubmit(event){
  event.preventDefault();
  console.log(`Застосовано фільтр ${filterName} з значенням ${filterValue}`);
  console.log(`Масштаб зображення - ${scaleLevel*100}%`);
}

