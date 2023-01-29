import { thumbnail } from './picture.js';

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
];
const comments = [
  'Все відмінно!',
  'Загалом все непогано. Але не всі.',
  'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
  'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
  'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
  'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?',
];
const names = [
  'Віола Ярославська',
  'Денис Круть',
  'Вован Пежанський',
  'Христя Чехович',
  'Мстислав Жуковський',
  'Юрій Андрейченко',
  'П\'єр Михайличенко',
  'Леонід Дашук',
  'Наталя Потебенько',
  'Надія Нижанківська',
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
    console.log(`i: ${i}`);
    outputArray.push(cloneArray.splice(randomIndex, 1));
    console.log(`Inputs: ${cloneArray}`);
    console.log(`Outputs: ${outputArray}`);
  }
  return outputArray;
}

function createPost(id){
  let commentaries = createComment(getRandomNumber(commentsRange[0], commentsRange[1]));
  return {
    id: id,
    url: `./photos/${id + 1}.jpg`,
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
      message: comments[getRandomNumber(1, comments.length)],
      name: names[getRandomNumber(1, names.length)],
    }
    comments.push(comment);
  }
  return comments;
}

let posts = [];
function generatePosts(quantity) {
  let numbers = [];
  for (let i =0; i < quantity; ++i){
    numbers.push(i);
  }
  console.log(numbers);
  let randomNumbers = shuffleArray(numbers);

  for (let i = 0; i < quantity; i++){
    posts.push(createPost(Number(randomNumbers[i])));
  }
}
generatePosts(postsQuantity);

function genOtherUsersPics(){
  for (let i = 0; i < posts.length; i++){
    thumbnail(posts[i].url,posts[i].likes,posts[i].comments.length);
  }
}
genOtherUsersPics();
