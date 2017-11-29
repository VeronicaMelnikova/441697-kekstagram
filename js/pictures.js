'use strict';

var COMMENT_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var descriptionPhotos = [];
var PHOTOS_COUNT = 25;

// var galleryOverlay = document.querySelector('.gallery-overlay');
// galleryOverlay.classList.remove('hidden');

var pictureTemplate = document.querySelector('#picture-template').content;

var picturesElement = document.querySelector('.pictures');

var getRandomIndex = function (array) {
  var random = -0.5 + Math.random() * array.length;
  return Math.round(random);
};

var getRandomComment = function (array) {
  var index = getRandomIndex(array);
  return array[index];
};

var getRandomLike = function (minLike, maxLike) {
  var randomLike = minLike - 0.5 + Math.random() * (maxLike - minLike + 1);
  randomLike = Math.round(randomLike);
  return randomLike;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture img').src = picture.url;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < PHOTOS_COUNT; i++) {
  descriptionPhotos[i] = {
    url: "photos/" + (i + 1) + ".jpg",
    likes: getRandomLike(15, 200),
    comments: getRandomComment(COMMENT_LIST)
  };
  fragment.appendChild(renderPicture(descriptionPhotos[i]));
}
picturesElement.appendChild(fragment);
