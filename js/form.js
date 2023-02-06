const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadPopupClose = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const tagInput = document.querySelector('.text__hashtags');

// photoInput.onChange = onPhotoUpload();

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
  const tags = value.split(space);
  console.log(tags);

  tags.forEach(tag => {
    let chars = tag.split();
    console.log(chars);
  });
  // check every tag

}

/*
#hey  ##hi #!hello #ho%lla #aloha #hehe
 */
