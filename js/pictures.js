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

var overlayElement = document.querySelector('.gallery-overlay-preview');
var renderOverlay = function (over) {
  overlayElement.querySelector('.gallery-overlay-image').src = over.url;
  overlayElement.querySelector('.likes-count').textContent = over.likes;
  overlayElement.querySelector('.comments-count').textContent = over.comments.length;
};


var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
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
var generateHandler = function (object) {
  return function (evt) {
    evt.preventDefault();
    renderOverlay(object);
    openPopup();
  };
};


for (var i = 0; i < PHOTOS_COUNT; i++) {
  var handler = generateHandler(descriptionPhotos[i]);
  pictures[i].addEventListener('click', handler);
}

var uploadOverlay = document.querySelector('.upload-overlay');
var input = document.querySelector('.upload-input');
var uploadClose = document.querySelector('#upload-cancel');
var uploadTextarea = document.querySelector('.upload-form-description');

var onOverlayEscPress = function (evt) {
  var active = document.activeElement;
  if (evt.keyCode === ESC_KEYCODE) {
    if (active !== uploadTextarea) {
      closeUploadOverlay();
    }
  }
};

var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onOverlayEscPress);
};

var openUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onOverlayEscPress);
};

input.addEventListener('change', function () {
  openUploadOverlay();
});

uploadClose.addEventListener('click', function () {
  closeUploadOverlay();
});


// фильтры
var uploadEffects = document.querySelector('.upload-effect-controls');
var imagePreview = document.querySelector('.effect-image-preview');


uploadEffects.addEventListener('click', function (evt) {
  var target = evt.target.value;

  if (evt.target.tagName === 'INPUT') {
    var imageClass = 'effect-' + target;
    imagePreview.classList.remove(imagePreview.classList.item(1));
    imagePreview.classList.add(imageClass);
  }
});


// маштаб
var resizeButtonInc = document.querySelector('.upload-resize-controls-button-inc');
var resizeButtonDec = document.querySelector('.upload-resize-controls-button-dec');
var resizeValue = document.querySelector('.upload-resize-controls-value').value;
var imageScale = document.querySelector('.upload-resize-controls-value');

var zoomStep = 25;
var zoomMin = 25;
var zoomMax = 100;

var decImage = function () {
  var resizeValueDec = +resizeValue.slice(0, -1);
  if (resizeValueDec > zoomMin + zoomStep - 1) {
    resizeValueDec = resizeValueDec - zoomStep;
  }
  resizeValueDec = resizeValueDec + '%';
  return resizeValueDec;
};

var decScale = function () {
  var scale = decImage().slice(0, -1);
  scale = 'scale(' + (scale / 100) + ')';
  return scale;
};


resizeButtonDec.addEventListener('click', function () {
  imageScale.value = decImage();
  imagePreview.style.transform = decScale();
  resizeValue = decImage();
});

var incImage = function () {
  var resizeValueInc = +resizeValue.slice(0, -1);
  if (resizeValueInc < zoomMax - zoomStep + 1) {
    resizeValueInc = resizeValueInc + zoomStep;
  }
  resizeValueInc = resizeValueInc + '%';
  return resizeValueInc;
};

var incScale = function () {
  var scale = incImage().slice(0, -1);
  scale = 'scale(' + (scale / 100) + ')';
  return scale;
};

resizeButtonInc.addEventListener('click', function () {
  imageScale.value = incImage();
  imagePreview.style.transform = incScale();
  resizeValue = incImage();
});


// #теги
var hashtagsForm = document.querySelector('.upload-form-hashtags');
var form = document.querySelector('.upload-form');
var sendButton = document.querySelector('.upload-form-submit');

var getHashtags = function () {
  var hashtags = hashtagsForm.value;
  hashtags = hashtags.split(' ');
  return hashtags;
};
var listOfHashtags = getHashtags();

var errorHashtags = function () {
  sendButton.addEventListener('click', function (evt) {
    evt.preventDefault();
  });
  hashtagsForm.classList.add('upload-message-error');
};

var checkQuality = function () {
  if (listOfHashtags.legth > 5) {
    checkLength();
  } else {
    errorHashtags();
  }
};

var checkLength = function () {
  var hashtagsLetters = listOfHashtags[i].split('');
  for (i = 0; i < listOfHashtags.length; i++) {
    if (hashtagsLetters.length < 20) {
      checkHashtagSymbol();
    } else {
      errorHashtags();
    }
  }
};

var checkHashtagSymbol = function () {
  for (i = 0; i < listOfHashtags.length; i++) {
    if (listOfHashtags[i].lastIndexOf('#') === 0) {
      checkRepeat();
    } else {
      errorHashtags();
    }
  }
};

var checkRepeat = function () {
  var copyListOfHashtags = listOfHashtags.slice();
  copyListOfHashtags[i] = copyListOfHashtags[i].toUpperCase();
  copyListOfHashtags[i] = copyListOfHashtags[i].sort();
  for (i = 0; i < copyListOfHashtags[i].length; i++) {
    if (copyListOfHashtags[i] !== copyListOfHashtags[i + 1]) {
      form.submit();
    } else {
      errorHashtags();
    }
  }
};

sendButton.addEventListener('click', function () {
  checkQuality();
});
