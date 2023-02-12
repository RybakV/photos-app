const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadPopupClose = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const tagInput = document.querySelector('.text__hashtags');

export function onPhotoUpload(){
  console.log('input changed');
  console.log(tagInput.value);
  openUploadPopup();
}

function openUploadPopup(){
  uploadPopup.classList.remove('hidden');
  uploadPopupClose.addEventListener('click', closeUploadPopup);
  body.classList.add('modal-open');
  console.log('popup opened');

  tagInput.addEventListener('input', checkTag);
}

function closeUploadPopup() {
  uploadPopup.classList.add('hidden');
  uploadPopupClose.removeEventListener('click', closeUploadPopup);
  body.classList.remove('modal-open');
  tagInput.value = null;
  console.log(tagInput.value);
  console.log('popup closed');

  tagInput.removeEventListener('input', checkTag);
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
  console.log(tags);

  let validationMessage = '';

  // чи тегів не більше 5
  if (tags.length > tagsMaxQuantity) {
    validationMessage = 'Помилка: Тегів має бути не більше п\'яти';
    console.log('Помилка: Більше 5 тегів');
  }
  else { // перевірити повторки
    let alreadySeen = {};
    tags.forEach(function(str) {
      if (alreadySeen[str]) {
        console.log(`Тег ${str} повтрюється.`);
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

     // чи починається на #
     if (chars[0] === '#') {
       chars.shift();
     } else if (chars[0] !== '#') {
       validationMessage = `Помилка: Тег ${chars.join('')} має починатись з #.`;
       console.log(`Помилка: Тег ${chars.join('')} має починатись з #.`);
     }
     // чи містить сторонні символи
     else if (!(/^[A-Za-z0-9]*$/.test(chars.join('')))) {
       validationMessage = `Помилка: Тег ${chars.join('')} містить сторонні символи`;
       console.log(`Помилка: Тег ${chars.join('')} містить сторонні символи`);
     }
     // чи складається тільки з решітки
     else if (chars.length === 0) {
       validationMessage = 'Помилка: Тег не може складатися тільки з одних ґрат.';
       console.log('Помилка: Одні грати');
     }
     // чи довжина до 20 символів
     else if (chars.length > tagMaxLength) {
       validationMessage = 'Помилка: Максимальна довжина тегу - 20 символів.';
       console.log('Помилка: Більше 20 символів.');
     }
   });
 }


  // вивести помилку
  if (validationMessage) {
    tagInput.setCustomValidity(validationMessage);
    tagInput.reportValidity();
  }
  // вивести корректні теги отримані в підсумку
  else {
    console.log(`Чудово! Ваші теги: ${tags.join()}`);
  }
}
/*
Тестуємо теги:
#hey  #HEY ##hi # #!HELLO #ho%lla aloha #hehe
#hey #HEY #HELLO #holla #3
*/
