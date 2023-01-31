const container = document.querySelector(".pictures");
const tmpPicture = document.getElementById("picture");
const thumbnailsFragment = new DocumentFragment();

export function thumbnails(thumbs){
  thumbs.forEach((thumb=> createThumb(thumb)));
  container.append(thumbnailsFragment);
}

function createThumb(data) {
  const tmpPictureClone = tmpPicture.content.cloneNode(true);
  const linkTag = tmpPictureClone.querySelector(".picture");
  const imageTag = tmpPictureClone.querySelector(".picture__img");
  const likesBox = tmpPictureClone.querySelector(".picture__likes");
  const commentsCounter = tmpPictureClone.querySelector(".picture__comments");

  console.log(data);

  linkTag.dataset.picid = data.id;
  imageTag.src = data.url;
  likesBox.innerText = data.likes;
  commentsCounter.innerText = data.comments.length;
  thumbnailsFragment.append(tmpPictureClone);
}
