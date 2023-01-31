import { thumbnails } from './picture.js';
import { openBigImage } from './lightbox.js';

const postsQuantity = 25;
const avatarsQuantity = 6;
const likesRange = [25,200];
const commentsRange = [1,3];

const descriptions = [
  'Це фото було зроблено у відпустці минулого року',
  'Це мій подарунок на день народження',
  'Тут мала бути якась цитата з пацанського цитатника',
  'Ось гарне фото для гарного настрою',
  'Я принципіально не фоткаю їжу!!!',
  'Поставте лайк будьласка. Дуже потрібно!',
  'Хто знає де таке знайти? Мене забанили в гуглі',
  'Сьогодні гарний день, чи не так?',
  'Ще один крок на шляху до успіху',
  'Якщо уподобали цей пост, то гляньте і вчорашній.'
];
const allComments = [
  'Все відмінно!',
  'Дуже класно, таке яскраве фото',
  'Тільки не кажи що ви витратили на це всю зарплату :О',
  'Вчора теж зробила таку фотку, прикол!',
  'Приходь завтра на піцу!',
  'Приходь на каву, все розповіси.',
  'І як все пройшло? Тобі сподобалось?',
  'Не вірю своїм очам, очманіти!',
  'Звідки в тебе стільки підписників?',
  'Доброо дня! Ви продаєте рекламу в профілі?',
  'Ну все начувайтесь! Я скоро приїду до вас!!!',
  'Ніколи не пізно зганяти в ресторан',
];
const names = [
  'Віола Ярославська',
  'Денис Круть',
  'Пацан Вован',
  'Христя Чех',
  'Мстислав Жукович',
  'Юрій Андрійченко',
  'П\'єр Михайличенко',
  'Леонід Дашук',
  'Наталя не Надія',
  'Надія Київська',
];

function getRandomNumber(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArray(inputArray){
  let cloneArray = JSON.parse(JSON.stringify(inputArray));
  let outputArray = [];
  for (let i = 0; i < inputArray.length; i++){
    let randomIndex = getRandomNumber(0, cloneArray.length - 1);
    outputArray.push(cloneArray.splice(randomIndex, 1));
  }
  return outputArray;
}

function createPost(id){
  let commentaries = createComment(getRandomNumber(commentsRange[0], commentsRange[1]));
  return {
    id: id + 1,
    url: `./photos/${id + 1}.jpg`,
    avatar: `./img/avatar-${getRandomNumber(1,avatarsQuantity)}.svg`,
    description: descriptions[getRandomNumber(1, descriptions.length - 1)],
    likes: getRandomNumber(likesRange[0],likesRange[1]),
    comments: commentaries
  }
}

function createComment(quantity){
  let comments = [];
  for (let i = 0; i < quantity; i++) {
    let comment = {
      id: i,
      avatar: `./img/avatar-${getRandomNumber(1,avatarsQuantity)}.svg`,
      message: allComments[getRandomNumber(1, allComments.length -1)],
      name: names[getRandomNumber(1, names.length -1)],
    }
    comments.push(comment);
  }
  return comments;
}

let posts = [];
function generatePosts(quantity) {
  let numbers = [];
  for (let i = 0; i < quantity; ++i){
    numbers.push(i);
  }
  let randomNumbers = shuffleArray(numbers);

  for (let i = 0; i < quantity; i++){
    posts.push(createPost(Number(randomNumbers[i])));
  }
}
generatePosts(postsQuantity);

thumbnails(posts);

const container = document.querySelector(".pictures");
container.addEventListener("click", function(event) {
  let pictureWraper = event.target.closest('.picture');
  if (pictureWraper) {
    openBigImage(pictureWraper, posts);
  }
});
