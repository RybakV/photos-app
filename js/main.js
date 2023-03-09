import { thumbnails } from './picture.js';
import { openBigImage } from './lightbox.js';
import {closeUploadPopup, onPhotoUpload} from "./form.js";
import {createSlider, formSubmit} from "./no-ui-slider.js";
import { uploadImageZoom } from "./no-ui-slider.js";
import {applyFilter} from "./filter.js";

let posts = [];
fetch("http://localhost:4000/photos")
  .then((response) => response.json())
  .then((data) => {
    posts = data;
    thumbnails(posts);
  });

const filters = document.querySelector(".img-filters");
filters.classList.remove('img-filters--inactive');

const container = document.querySelector(".pictures");
container.addEventListener('click', function(event) {
  let pictureWraper = event.target.closest('.picture');
  if (pictureWraper) {
    openBigImage(pictureWraper, posts);
  }
});

const photoInput = document.querySelector('#upload-file');
photoInput.addEventListener('change', onPhotoUpload);

createSlider();
uploadImageZoom();

const submitImageForm = document.querySelector('#upload-select-image');
submitImageForm.addEventListener("submit", submitNewImage);
async function submitNewImage(event){
  event.preventDefault();

  let newImageData = await formSubmit();
  posts.push(newImageData);

  const newThumbnails = [newImageData];
  thumbnails(newThumbnails);
  closeUploadPopup();
}

// Photos filter
const debounce = (func, wait) => {
  let debounceTimer
  return function() {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer
      = setTimeout(() => func.apply(context, args), wait)
  }
}

const filtersParent = document.querySelector(".img-filters__form");

filtersParent.addEventListener('click', debounce(listenFilter, 500));

function listenFilter(event){
  let filteredPosts = applyFilter(event, posts);
  thumbnails(filteredPosts);
}






