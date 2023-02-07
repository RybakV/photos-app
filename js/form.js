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

  tags.forEach(tag => {
    console.log(tag);
    const chars = tag.split('');

    console.log(chars);
    // чи починається на #
    if (chars[0] === '#') {
      chars.shift();
    }
    else {
      validationMessage = 'Помилка: Теги мають починатись на # і не містити пробілів.';
      console.log('Помилка: Нема решітки на початку');
    }
    // чи містить сторонні символи
    if (/^[A-Za-z0-9]*$/.test(chars.join(''))) {
      console.log(chars.join(''));
    }
    else {
      validationMessage = 'Помилка: Теги мають містити тільки букви та цифри.';
      console.log('Помилка: Сторонні символи');
    }
    // чи складається тільки з решітки
    if (chars.length === 0) {
      validationMessage = 'Помилка: Тег не може складатися тільки з одних ґрат.';
      console.log('Помилка: Одні грати');
    }
    // чи довжина до 20 символів
    if (chars.length > tagMaxLength) {
      validationMessage = 'Помилка: Максимальна довжина тегу - 20 символів.';
      console.log('Помилка: Більше 20 символів.');
    }
  });

  // чи тегів не більше 5
  if (tags.length > tagsMaxQuantity) {
    validationMessage = 'Помилка: Тегів має бути не більше п\'яти';
    console.log('Помилка: Більше 5 тегів');
  }

  // перевірити повторки
  let alreadySeen = {};
  tags.forEach(function(str) {
    if (alreadySeen[str]) {
      console.log(`Тег ${str} повтрюється.`);
      validationMessage = `Помилка: Тег ${str} повтрюється, треба прибрати повтор`;
    }
    else {
      alreadySeen[str] = true;
    }
  });

  // вивести помилку
  if (validationMessage) {
    tagInput.setCustomValidity(validationMessage);
    tagInput.reportValidity();
  }
  // вивести корректні теги отримані в підсумку
  else {
    const successsMessage = `Чудово! Ваші теги: ${tags.join()}`;
    tagInput.setCustomValidity(successsMessage);
    tagInput.reportValidity();
  }
}
/*
Тестуємо теги:
#hey  #HEY ##hi # #!HELLO #ho%lla aloha #hehe
#hey #HEY #HELLO #holla #3
*/
