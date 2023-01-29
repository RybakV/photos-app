export function thumbnail(imgUrl,likes,commentsQuantity){
  const container = document.querySelector(".pictures");
  const tmpPicture = document.getElementById("picture");

  let tmpPictureClone = tmpPicture.content.cloneNode(true);

  let cloneImg = tmpPictureClone.querySelector('.picture__img');
  let likesBox = tmpPictureClone.querySelector(".picture__likes");
  let commentsCounter = tmpPictureClone.querySelector(".picture__comments");

  cloneImg.setAttribute('src',imgUrl);
  likesBox.innerHTML = likes;
  commentsCounter.innerHTML = commentsQuantity;

  container.append(tmpPictureClone);
}


