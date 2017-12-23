'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var UPLOAD_RESIZE_STEP = 25;
  var UPLOAD_RESIZE_MIN = 25;
  var UPLOAD_RESIZE_MAX = 100;
  var MAX_TAGS_COUNT = 5;
  var MAX_TAG_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;
  var DEFAULT_FILTER = 'effect-none';
  var uploadOverlay = document.querySelector('.upload-overlay');
  var fileInput = document.querySelector('.upload-input');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadTextarea = document.querySelector('.upload-form-description');
  var form = document.querySelector('.upload-form');

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
    form.reset();
    changeFilter(DEFAULT_FILTER);
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
  var hashtagsInput = form.querySelector('.upload-form-hashtags');
  var listOfHashtags;

  var getHashtags = function () {
    var hashtags = hashtagsInput.value;
    return hashtags;
  };

  var showError = function (element) {
    element.classList.add('upload-message-error');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    listOfHashtags = getHashtags().split(' ');
    if (checkTags()) {
      if (checkComments()) {
        form.submit();
        form.reset();
        changeFilter(DEFAULT_FILTER);
      } else {
        showError(commentsInputElement);
      }
    } else {
      showError(hashtagsInput);
    }
  });

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
    return getHashtags().length === 0 || checkTagsQuantity() && checkTagsElements();
  };

  // валидация комментариев
  var commentsInputElement = form.querySelector('.upload-form-description');

  var getCommentsLength = function () {
    var comments = commentsInputElement.value;
    return comments.length;
  };

  var checkComments = function () {
    return getCommentsLength() < MAX_COMMENT_LENGTH;
  };

})();
