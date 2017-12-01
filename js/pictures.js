'use strict';

var COMMENT_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHOTOS_COUNT = 25;
var descriptionPhotos = [];
var pictureTemplate = document.querySelector('#picture-template').content;
var picturesElement = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var fragment = document.createDocumentFragment();
var overlay = document.createDocumentFragment();

var getRandomIndex = function (array) {
  var random = -0.5 + Math.random() * array.length;
  return Math.round(random);
};

var getRandomLike = function (minLike, maxLike) {
  var randomLike = minLike - 0.5 + Math.random() * (maxLike - minLike + 1);
  randomLike = Math.round(randomLike);
  return randomLike;
};

var getRandomComment = function (array) {
  var numberOfComments = getRandomLike(1, 2);
  var photoComments = [];
  for (var i = 0; i < numberOfComments; i++) {
    var index = getRandomIndex(array);
    photoComments[i] = array[index];
  }
  return photoComments;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture img').src = picture.url;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

  return pictureElement;
};

var renderDescriptionPhoto = function () {
  fillingDescriptionPhotos();
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    fragment.appendChild(renderPicture(descriptionPhotos[i]));
  }
  return fragment;
};

var fillingDescriptionPhotos = function () {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    descriptionPhotos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomLike(15, 200),
      comments: getRandomComment(COMMENT_LIST)
    };
  }
  return descriptionPhotos;
};


picturesElement.appendChild(renderDescriptionPhoto());

galleryOverlay.classList.remove('hidden');

var renderOverlay = function (over) {
  var overlayElement = document.querySelector('.gallery-overlay-preview');

  overlayElement.querySelector('.gallery-overlay-image').src = over.url;
  overlayElement.querySelector('.likes-count').textContent = over.likes;
  overlayElement.querySelector('.comments-count').textContent = over.comments.length;
  return overlayElement;
};

overlay.appendChild(renderOverlay(descriptionPhotos[0]));

galleryOverlay.appendChild(overlay);
