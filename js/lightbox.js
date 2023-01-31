import { allPosts } from './main.js';

const lightbox = document.querySelector(".big-picture");
const bigImg = document.querySelector(".big-picture__img img");
const container = document.querySelector(".pictures");
const btnCloseLightbox = document.querySelector("#picture-cancel");
const btnLike = document.querySelector(".likes-count");
const commentsCounter = document.querySelector(".comments-count");
const commentsParent = document.querySelector(".social__comments");
const photoDescription = document.querySelector(".social__caption");


container.addEventListener("click", function(event) {
  const pictureWraper = event.target.closest(".picture");
  if (pictureWraper.dataset.picid != undefined) { // if the attribute exists...
    openBigImage(pictureWraper);
  }
  else {
    console.log('Click target is not a picture');
  }
});

export function openBigImage(target){
  const id = Number(target.dataset.picid);
  const smallImg = target.querySelector(".picture__img");
  bigImg.src = smallImg.src;
  lightbox.classList.remove("hidden");
  toggleBodyScroll("noscroll");

  const postData = allPosts.find(post => post.id === id);

  btnLike.innerText = postData.likes;
  commentsCounter.innerText = postData.comments.length;

  // ------- full comments --------
  const socialComment = document.querySelector(".social__comment");
  const tmpSocialComment = socialComment.cloneNode(true);

  const commentsFragment = new DocumentFragment();
  postData.comments.forEach(comment => {
    console.log(tmpSocialComment.querySelector(".social__text"));
    tmpSocialComment.querySelector(".social__text").innerText = comment.message;
    console.log(tmpSocialComment.querySelector(".social__text"));

    // stopped here
    commentsFragment.append(tmpSocialComment.innerText);
  })

  commentsParent.innerHTML = commentsParent.innerHTML + commentsFragment;
}

btnCloseLightbox.addEventListener("click", closeBigImage);
function closeBigImage(){
  lightbox.classList.add("hidden");
  toggleBodyScroll('scroll')
}
document.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 27) {
    closeBigImage()
  }
});

function toggleBodyScroll(state) {
  if (state == "scroll") {
    const body = document.querySelector("body");
    body.classList.remove("modal-open");
  }
  else if (state == "noscroll") {
    const body = document.querySelector("body");
    body.classList.add("modal-open");
  }
}


