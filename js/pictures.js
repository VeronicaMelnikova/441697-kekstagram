'use strict';

var COMMENT_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHOTOS_COUNT = 25;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var UPLOAD_RESIZE_STEP = 25;
var UPLOAD_RESIZE_MIN = 25;
var UPLOAD_RESIZE_MAX = 100;
var MAX_TAGS_COUNT = 5;
var MAX_TAG_LENGTH = 20;
var MAX_COMMENT_LENGTH = 140;

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

// заполнение массива с описанием фотографий
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

var previewOverlay = document.querySelector('.gallery-overlay-preview');

// добавляет описание к изображению
var addDescriptionToPhoto = function (data) {
  previewOverlay.querySelector('.gallery-overlay-image').src = data.url;
  previewOverlay.querySelector('.likes-count').textContent = data.likes;
  previewOverlay.querySelector('.comments-count').textContent = data.comments.length;
};


var pictures = document.querySelectorAll('.picture');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

var onKeyPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onKeyPress);
};

var closePopup = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onKeyPress);
};

//  закрывает просмотр фотографии
galleryOverlayClose.addEventListener('click', function () {
  closePopup();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// вызывает фукции открытия фотографии и заполнения описанием
var generateHandler = function (object) {
  return function (evt) {
    evt.preventDefault();
    addDescriptionToPhoto(object);
    openPopup();
  };
};

var fillDataHandler = function () {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    var fillingPreview = generateHandler(descriptionPhotos[i]);
    pictures[i].addEventListener('click', fillingPreview);
  }
};
fillDataHandler();

var uploadOverlay = document.querySelector('.upload-overlay');
var fileInput = document.querySelector('.upload-input');
var uploadClose = document.querySelector('#upload-cancel');
var uploadTextarea = document.querySelector('.upload-form-description');

var onOverlayKeyPress = function (evt) {
  var active = document.activeElement;
  if (evt.keyCode === ESC_KEYCODE) {
    if (active !== uploadTextarea) {
      closeUploadOverlay();
    }
  }
};

var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onOverlayKeyPress);
};

var openUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onOverlayKeyPress);
};

fileInput.addEventListener('change', function () {
  openUploadOverlay();
});

uploadClose.addEventListener('click', function () {
  closeUploadOverlay();
});


// применение фильтров
var uploadEffects = document.querySelector('.upload-effect-controls');
var imagePreview = document.querySelector('.effect-image-preview');
var currentFilter;

var changeFilter = function (filterName) {
  if (currentFilter) {
    imagePreview.classList.remove(currentFilter);
  }
  imagePreview.classList.add(filterName);
  currentFilter = filterName;
};

uploadEffects.addEventListener('click', function (evt) {
  var targetValue = evt.target.value;
  if (evt.target.tagName === 'INPUT') {
    var imageClass = 'effect-' + targetValue;
    changeFilter(imageClass);
  }
});


// изменение маштаба загруженного изображения
var uploadImagePreview = document.querySelector('.effect-image-preview');
var uploadResizeInc = document.querySelector('.upload-resize-controls-button-inc');
var uploadResizeDec = document.querySelector('.upload-resize-controls-button-dec');
var uploadResizeField = document.querySelector('.upload-resize-controls-value');

var getScaleValue = function () {
  return parseInt(uploadResizeField.value.slice(0, -1), 10);
};

var setScaleValue = function (value) {
  uploadResizeField.value = value + '%';
};

var getScaleValueInRange = function (value) {
  return Math.min(UPLOAD_RESIZE_MAX, Math.max(UPLOAD_RESIZE_MIN, value));
};

var setScaleForUploadImage = function (scale) {
  uploadImagePreview.style.transform = 'scale(' + (scale / 100) + ')';
};

var changeScale = function (step) {
  var currentScaleValue = getScaleValue();
  var newScaleValue = getScaleValueInRange(currentScaleValue + step);

  setScaleValue(newScaleValue);
  setScaleForUploadImage(newScaleValue);
};

var onResizeInc = function () {
  changeScale(UPLOAD_RESIZE_STEP);
};

var onResizeDec = function () {
  changeScale(-UPLOAD_RESIZE_STEP);
};

uploadResizeInc.addEventListener('click', onResizeInc);
uploadResizeDec.addEventListener('click', onResizeDec);


// валидация хештегов
var form = document.querySelector('.upload-form');
var hashtagsInputElement = form.querySelector('.upload-form-hashtags');
var listOfHashtags;

var getHashtags = function () {
  var hashtags = hashtagsInputElement.value;
  return hashtags.split(' ');
};

var showError = function (element) {
  element.classList.add('upload-message-error');
};

form.onsubmit = function (evt) {
  evt.preventDefault();
  listOfHashtags = getHashtags();
  if (checkTags()) {
    if (checkComments()) {
      form.submit();
      form.reset();
    } else {
      showError(commentsInputElement);
    }
  } else {
    showError(hashtagsInputElement);
  }
};

// проверки
var checkTagsQuantity = function () {
  return listOfHashtags.length < MAX_TAGS_COUNT;
};

var checkTagsLength = function (tag) {
  return tag.length > MAX_TAG_LENGTH || tag.length < 2;
};

var checkHashIndex = function (tag) {
  return tag.lastIndexOf('#') !== 0;
};

var checkHashRepeat = function (tag, next) {
  return tag.toUpperCase() === next.toUpperCase();
};

var checks = [
  checkTagsLength,
  checkHashIndex,
  checkHashRepeat
];

var checkEvery = function (tag, next) {
  for (var i = 0; i < checks.length; i++) {
    if (checks[i](tag, next)) {
      return true;
    }
  }
  return false;
};

var checkTagsElements = function () {
  var copy = listOfHashtags.slice().sort();
  for (var i = 0; i < listOfHashtags.length; i++) {
    var next = copy[i + 1] || '';
    if (checkEvery(copy[i], next)) {
      return false;
    }
  }
  return true;
};

var checkTags = function () {
  if (listOfHashtags.length !== 0) {
    return checkTagsQuantity() && checkTagsElements();
  }
  return true;
};

// валидация комментариев
var commentsInputElement = form.querySelector('.upload-form-description');

var getCommentsLength = function () {
  var comments = commentsInputElement.value;
  return comments.length;
};

var checkComments = function () {
  if (getCommentsLength() < MAX_COMMENT_LENGTH) {
    return true;
  } else {
    return false;
  }
};
