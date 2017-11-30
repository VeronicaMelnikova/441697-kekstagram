'use strict';

var COMMENT_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var descriptionPhotos = [];
var photoComments = [];
var PHOTOS_COUNT = 25;


var pictureTemplate = document.querySelector('#picture-template').content;
var picturesElement = document.querySelector('.pictures');

var getRandomIndex = function (array) {
  var random = -0.5 + Math.random() * array.length;
  return Math.round(random);
};

var getRandomLike = function (minLike, maxLike) {
  var randomLike = minLike - 0.5 + Math.random() * (maxLike - minLike + 1);
  randomLike = Math.round(randomLike);
  return randomLike;
};

/*
function compareRandom() {
  return Math.random() - 0.5;
}

var getRandomComment = function () {
  var arrLegth = COMMENT_LIST.length - 1;
  for (var i = 0; i < 2; i++) {
    COMMENT_LIST.sort(compareRandom);
    photoComments[i] = COMMENT_LIST[arrLegth];
    arrLegth = arrLegth - i;
    COMMENT_LIST.splice(5, 1);
  }
  return photoComments;
};
*/
var w = getRandomLike(1, 2);

var getRandomComment = function () {
  for (var i = 0; i < w; i++) {
    var index = getRandomIndex(COMMENT_LIST);
    photoComments[i] = COMMENT_LIST[index];
  }
  return photoComments;
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
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomLike(15, 200),
    comments: getRandomComment()
  };
  fragment.appendChild(renderPicture(descriptionPhotos[i]));
}
picturesElement.appendChild(fragment);


var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');

var renderOverlay = function (over) {
  var overlayElement = galleryOverlay.cloneNode(true);

  overlayElement.querySelector('.gallery-overlay-image').src = over.url;
  overlayElement.querySelector('.likes-count').textContent = over.likes;
  overlayElement.querySelector('.comments-count').textContent = over.comments.length;

  return overlayElement;
};

var overlay = document.createDocumentFragment();
overlay.appendChild(renderOverlay(descriptionPhotos[0]));
galleryOverlay.appendChild(overlay);
