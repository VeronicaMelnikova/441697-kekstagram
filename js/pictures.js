'use strict';

var COMMENT_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHOTOS_COUNT = 25;

var pictureTemplate = document.querySelector('#picture-template').content;
var picturesElement = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');


var getRandomIndex = function (array) {
  var random = -0.5 + Math.random() * array.length;
  return Math.round(random);
};

var getRandomNumber = function (min, max) {
  var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
  randomNumber = Math.round(randomNumber);
  return randomNumber;
};

var getRandomComments = function (array) {
  var numberOfComments = getRandomNumber(1, 2);
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


var fillingDescriptionPhotos = function () {
  var descriptionPhotos = [];
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    descriptionPhotos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: getRandomComments(COMMENT_LIST)
    };
  }
  return descriptionPhotos;
};

var descriptionPhotos = fillingDescriptionPhotos();

var renderPhotos = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    fragment.appendChild(renderPicture(array[i]));
  }
  return fragment;
};

picturesElement.appendChild(renderPhotos(descriptionPhotos));

// galleryOverlay.classList.remove('hidden');

var renderOverlay = function (over) {
  var overlayElement = document.querySelector('.gallery-overlay-preview');

  overlayElement.querySelector('.gallery-overlay-image').src = over.url;
  overlayElement.querySelector('.likes-count').textContent = over.likes;
  overlayElement.querySelector('.comments-count').textContent = over.comments.length;
  return overlayElement;
};
renderOverlay(descriptionPhotos[0]);


var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var galleryOverlayOpen = document.querySelector('.picture'); // не переносится в начало
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

//  закрывашка
galleryOverlayClose.addEventListener('click', function () {
  closePopup();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// открывашка
galleryOverlayOpen.addEventListener('click', function () {
  openPopup();

});

galleryOverlayOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
