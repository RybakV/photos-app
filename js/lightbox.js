const lightbox = document.querySelector(".big-picture");
const bigImg = document.querySelector(".big-picture__img img");
const container = document.querySelector(".pictures");
const btnCloseLightbox = document.querySelector("#picture-cancel");

container.addEventListener('click', function(event) {
  const pictureWraper = event.target.closest(".picture");
  if (pictureWraper.dataset.picid != undefined) { // if the attribute exists...
    openBigImage(pictureWraper);
    console.log('target has dataset');
  }
  else {
    console.log('Click target is not a picture');
  }
});

export function openBigImage(target){
  const id = target.dataset.picid;
  const smallImg = target.querySelector(".picture__img");
  bigImg.src = smallImg.src;
  lightbox.classList.remove("hidden");
}

btnCloseLightbox.addEventListener('click', closeLightbox);

function closeLightbox(){
  lightbox.classList.add("hidden");
}


