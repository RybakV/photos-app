const postsNumber = 25;
const descriptionArray = [
  'Це фото було зроблено у відпустці минулого року',
  'Це мій подарунок на день народження',
  'Тут мала бути якась цитата з пацанського цитатника',
  'Ось гарне фото для гарного настрою',
  'Я принципіально не фоткаю їжу!!!',
  'Поставте лайк будьласка. Дуже потрібно!',
  'Хто знає де таке знайти? Мене забанили в гуглі',
];
const commentsArray = [
  'Все відмінно!',
  'Загалом все непогано. Але не всі.',
  'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
  'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
  'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
  'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?',
];
const namesArray = [
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

function createPost(id){
  return {
    id: id,
    url: './photos/'+ getRandomNumber(1,25) +'.jpg',
    description: descriptionArray[getRandomNumber(1, descriptionArray.length)],
    likes: getRandomNumber(25,200),
  }
}

function createComment(id){
  return {
    id: id,
    avatar: './img/avatar-'+ getRandomNumber(1,6) +'.svg',
    message: commentsArray[getRandomNumber(1, commentsArray.length)],
    name: namesArray[getRandomNumber(1, namesArray.length)],
  }
}

console.log(createComment(1));
console.log(createPost(1));
