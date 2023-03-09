export function applyFilter(event, data) {
  hideALlPhotos();
  let btn = event.target.closest('.img-filters__button');
  switchBtn(btn);

  switch (btn.getAttribute('id')){
    case ('filter-default'):
      return data;
    case ('filter-random'):
      const randomPicturesQuantity = 10;
      const cloneData = JSON.parse(JSON.stringify(data));
      const randomPictures = [];
      for(let i = 0; i < randomPicturesQuantity; i++ ){
        let randomIndex = getRandomNumber(0,cloneData.length -1);
        randomPictures[i] = cloneData[randomIndex];
        cloneData.splice(randomIndex, 1);
      }
      return randomPictures;
    case ('filter-discussed'):
      const popularPictures = JSON.parse(JSON.stringify(data));
      popularPictures.sort(function(a, b) {
        return a.comments.length - b.comments.length;
      });
      return popularPictures;
  }
}

function hideALlPhotos() {
  const allPhotos = document.querySelectorAll(".picture");
  allPhotos.forEach(element => element.remove());
}

function getRandomNumber(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function switchBtn(target){
  const oldActiveBtn = document.querySelector(".img-filters__button--active");
  oldActiveBtn.classList.remove("img-filters__button--active");
  target.classList.add("img-filters__button--active");
}
