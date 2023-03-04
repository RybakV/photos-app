import {resetSlider} from "./no-ui-slider.js";

const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadPopupClose = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const tagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

export function onPhotoUpload(){
  openUploadPopup();
}

function openUploadPopup(){
  uploadPopup.classList.remove('hidden');
  uploadPopupClose.addEventListener('click', closeUploadPopup);
  body.classList.add('modal-open');

  enablePopupEscBtn();

  tagInput.addEventListener('focus', disablePopupEscBtn);
  commentInput.addEventListener('focus', disablePopupEscBtn);
  tagInput.addEventListener('blur', enablePopupEscBtn);
  commentInput.addEventListener('blur', enablePopupEscBtn);

  tagInput.addEventListener('input', checkTag);
  commentInput.addEventListener('input', checkComment);

}

function escBtn(event){
  if (event.keyCode === 27) {
    closeUploadPopup();
  }
}
function enablePopupEscBtn(){
  document.addEventListener("keydown", escBtn);
}
function disablePopupEscBtn(){
  document.removeEventListener("keydown", escBtn);
}

export function closeUploadPopup() {
  uploadPopup.classList.add('hidden');
  uploadPopupClose.removeEventListener('click', closeUploadPopup);
  body.classList.remove('modal-open');
  tagInput.value = null;

  disablePopupEscBtn();

  tagInput.removeEventListener('focus', disablePopupEscBtn);
  commentInput.removeEventListener('focus', disablePopupEscBtn);
  tagInput.removeEventListener('blur', enablePopupEscBtn);
  commentInput.removeEventListener('blur', enablePopupEscBtn);

  tagInput.removeEventListener('input', checkTag);
  commentInput.removeEventListener('input', checkComment);

  resetSlider();
  uploadPopup.style.filter = '';
}

function checkTag(){
  tagInput.setCustomValidity('');

  const value = this.value
  const space = ' ';
  const tagsRaw = value.split(space);
  const tagsNoSpaces = tagsRaw.filter(value => value != '');
  const tagsLower = tagsNoSpaces.map(element => {
    return element.toLowerCase();
  });
  const tags = tagsLower;
  const tagMaxLength = 19;
  const tagsMaxQuantity = 5;

  let validationMessage = '';

  if (tags.length > tagsMaxQuantity) {
    validationMessage = 'Помилка: Тегів має бути не більше п\'яти';
  }
  else {
    let alreadySeen = {};
    tags.forEach(function(str) {
      if (alreadySeen[str]) {
        validationMessage = `Помилка: Тег ${str} повтрюється, треба прибрати повтор`;
      }
      else {
        alreadySeen[str] = true;
        validateEachTag(tags);
      }
    });
  }

 function validateEachTag(tags) {
   tags.forEach(tag => {
     const chars = tag.split('');
     if (chars[0] === '#') {
       chars.shift();
     }
     else if (chars[0] !== '#') {
       validationMessage = `Помилка: Тег ${tag} має починатись з #.`;
     }
     if (!(/^[A-Za-z0-9]*$/.test(chars.join('')))) {
       validationMessage = `Помилка: Тег ${tag} містить сторонні символи`;
     }
     else if (chars.length === 0) {
       validationMessage = 'Помилка: Тег # не може складатися тільки з одних ґрат.';
     }
     else if (chars.length > tagMaxLength) {
       validationMessage = `Помилка: Максимальна довжина тегу - 20 символів.`;
     }
   });
 }
  if (validationMessage) {
    tagInput.setCustomValidity(validationMessage);
    tagInput.reportValidity();
  }
  else { console.log(`Чудово! Ваші теги: ${tags.join()}`); }
}

function checkComment(){
  commentInput.setCustomValidity('');
  let validationMessage = '';
  const tagMaxLength = 140;
  console.log(commentInput.value.length);

  if (commentInput.value.length > tagMaxLength) {
    validationMessage = `Коментар має бути не більше ${tagMaxLength}`;
  }

  if (validationMessage) {
    commentInput.setCustomValidity(validationMessage);
    commentInput.reportValidity();
  }
  else { console.log(`Чудово! Коментар перевірено.`); }
}
