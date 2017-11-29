'use strict';

var commentsList = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var descriptionPhotos = [];

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');

var pictureTemplate = document.querySelector('#picture-template').content;

var picturesElement = document.querySelector('.pictures');

var getRandomComment = function (array) {
  var randomComment = 0 - 0.5 + Math.random() * ((array.length - 1) + 1);
  randomComment = Math.round(randomComment);
  return randomComment;
};

var getRandomLike = function () {
  var randomLike = 15 - 0.5 + Math.random() * (200 - 15 + 1);
  randomLike = Math.round(randomLike);
  return randomLike;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture').src = picture.url;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < 25; i++) {
  descriptionPhotos[i] = {
    url: "photos/{{i + 1}}.jpg",
    likes: getRandomLike,
    comments: commentsList[getRandomComment(commentsList)]
  };
  fragment.appendChild(renderPicture(descriptionPhotos[i]));
}
picturesElement.appendChild(fragment);

console.log(commentsList[getRandomComment(commentsList)]);
console.log(getRandomLike());
