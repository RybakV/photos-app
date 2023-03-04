import { thumbnails } from './picture.js';
import { openBigImage } from './lightbox.js';
import { onPhotoUpload } from "./form.js";
import { createSlider } from "./no-ui-slider.js";
import { uploadImageZoom } from "./no-ui-slider.js";


let posts = [];
fetch("http://localhost:4000/photos")
  .then((response) => response.json())
  .then((data) => {
    posts = data;
    thumbnails(posts);
  });

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
uploadImageZoom()
