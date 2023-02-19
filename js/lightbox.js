const lightbox = document.querySelector(".big-picture");
const bigImg = document.querySelector(".big-picture__img img");
const btnCloseLightbox = document.querySelector("#picture-cancel");
const btnLike = document.querySelector(".likes-count");
const commentsCounter = document.querySelector(".comments-count");
const commentsShown = document.querySelector(".comments-shown");
const commentsParent = document.querySelector(".social__comments");
const photoPostAuthor = document.querySelector(".social__picture");
const photoDescription = document.querySelector(".social__caption");
const btnMoreComments = document.querySelector(".social__comments-loader");




export function openBigImage(target, posts){
  const id = Number(target.dataset.picid);

  lightbox.classList.remove("hidden");
  toggleBodyScroll("noscroll");

  const postData = posts.find(post => post.id === id);

  bigImg.src = postData.url;
  photoPostAuthor.src = postData.avatar;
  photoDescription.innerText = postData.description;
  btnLike.innerText = postData.likes;
  commentsCounter.innerText = postData.comments.length;
  commentsShown.innerText = postData.comments.length;

  const socialComment = document.querySelector("#social__comment");

  const commentsFragment = new DocumentFragment();

  commentsParent.innerHTML = '';

  const commentsPackQuantity = 5;
  const commentsQuantity = postData.comments.length;
  let commentsPosted = 0;
  let commentsPack = postData.comments.slice();

  addComments();
  if (commentsQuantity > commentsPackQuantity) {
    btnMoreComments.addEventListener("click", addComments);
  }
  function addComments() {
    addCommentsPack(commentsPack.slice(commentsPosted, commentsPosted + commentsPackQuantity));
    commentsShown.innerText = commentsPosted;

    if (commentsPosted < commentsQuantity) {
      showMoreCommentsBtn();
    }
    else {
      hideMoreCommentsBtn()
    }
  }

  function hideMoreCommentsBtn(){
    btnMoreComments.classList.add("hidden");
  }
  function showMoreCommentsBtn(){
    btnMoreComments.classList.remove("hidden");
  }

  function addCommentsPack(comments){
    comments.forEach(comment => {
      let tmpSocialComment = socialComment.content.cloneNode(true);

      tmpSocialComment.querySelector(".social__author").innerText = comment.name;
      tmpSocialComment.querySelector(".social__text").innerText = comment.message;
      tmpSocialComment.querySelector(".social__picture").src = comment.avatar;

      commentsFragment.append(tmpSocialComment);

      commentsPosted++;
    })

    commentsParent.append(commentsFragment);
  }

  btnCloseLightbox.addEventListener("click", closeBigImage);

  document.addEventListener("keydown", escBtn);
}

function escBtn(event){
  if (event.keyCode === 27) {
    closeBigImage();
  }
}
function closeBigImage(){
  lightbox.classList.add("hidden");
  toggleBodyScroll('scroll');
  document.removeEventListener("keydown", escBtn);
}

function toggleBodyScroll(state) {
  if (state === "scroll") {
    const body = document.querySelector("body");
    body.classList.remove("modal-open");
  }
  else if (state === "noscroll") {
    const body = document.querySelector("body");
    body.classList.add("modal-open");
  }
}
