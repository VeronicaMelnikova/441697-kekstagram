'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var MAX_TAGS_COUNT = 5;
  var MAX_TAG_LENGTH = 20;
  var MIN_TAG_LENGTH = 2;
  var MAX_COMMENT_LENGTH = 140;
  var DEFAULT_FILTER = 'effect-none';
  var DEFAULT_SCALE = 100;
  var DEFAULT_LEVEL = 20;
  var MAX_BLUR = 3;
  var MAX_BRIGHTNESS = 3;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadOverlay = document.querySelector('.upload-overlay');
  var fileInput = document.querySelector('.upload-input');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadDescription = document.querySelector('.upload-form-description');
  var form = document.querySelector('.upload-form');
  var effectLevel = form.querySelector('.upload-effect-level');
  var effectDrag = form.querySelector('.upload-effect-level-pin');
  var levelValue = form.querySelector('.upload-effect-level-val');
  var uploadEffects = document.querySelector('.upload-effect-controls');
  var uploadImagePreview = document.querySelector('.effect-image-preview');
  var hashtagsInput = form.querySelector('.upload-form-hashtags');
  var scaleControl = document.querySelector('.upload-resize-controls');
  var listOfHashtags;
  var currentFilter;

  var onOverlayKeyPress = function (evt) {
    var active = document.activeElement;
    if (evt.keyCode === ESC_KEYCODE) {
      if (active !== uploadDescription) {
        closeUploadOverlay();
      }
    }
  };

  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayKeyPress);
    form.reset();
    changeFilter(DEFAULT_FILTER);
    setScaleForUploadImage(DEFAULT_SCALE);
    changeLevelFilters(DEFAULT_LEVEL);
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

  // загрузка фотографии
  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        uploadImagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // применение фильтров
  var changeFilter = function (filterName) {
    if (currentFilter) {
      uploadImagePreview.classList.remove(currentFilter);
    }
    uploadImagePreview.classList.add(filterName);
    currentFilter = filterName;

    if (currentFilter !== 'effect-none') {
      effectLevel.classList.remove('hidden');
    } else {
      effectLevel.classList.add('hidden');
    }
  };


  uploadEffects.addEventListener('click', function (evt) {
    var targetValue = evt.target.value;
    if (evt.target.tagName === 'INPUT') {
      var imageClass = 'effect-' + targetValue;
      changeFilter(imageClass);
      changeLevelFilters(DEFAULT_LEVEL);
      effectDrag.style.left = DEFAULT_LEVEL + '%';
      levelValue.style.width = DEFAULT_LEVEL + '%';
    }
  });


  // изменение маштаба загруженного изображения
  var setScaleForUploadImage = function (scale) {
    uploadImagePreview.style.transform = 'scale(' + (scale / 100) + ')';
  };

  window.initializeScale(scaleControl, setScaleForUploadImage);


  // валидация хештегов
  var getHashtags = function () {
    var hashtags = hashtagsInput.value;
    return hashtags;
  };

  var showError = function (element) {
    element.classList.add('upload-message-error');
  };

  var deleteError = function (element) {
    element.classList.remove('upload-message-error');
  };

  var resetForm = function () {
    form.reset();
    changeFilter(DEFAULT_FILTER);
    setScaleForUploadImage(DEFAULT_SCALE);
    deleteError(uploadDescription);
    deleteError(hashtagsInput);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    listOfHashtags = getHashtags().split(' ');
    if (checkTags()) {
      if (checkComments()) {
        window.backend.save(new FormData(form), function () {
          uploadOverlay.classList.add('hidden');
          resetForm();
        }, window.onError);
      } else {
        showError(uploadDescription);
      }
    } else {
      showError(hashtagsInput);
    }
  });

  // проверки
  var checkTagsQuantity = function () {
    return listOfHashtags.length < MAX_TAGS_COUNT + 1;
  };

  var checkTagsLength = function (tag) {
    return tag.length > MAX_TAG_LENGTH || tag.length < MIN_TAG_LENGTH;
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
  var getCommentsLength = function () {
    var comments = uploadDescription.value;
    return comments.length;
  };

  var checkComments = function () {
    return getCommentsLength() < MAX_COMMENT_LENGTH + 1;
  };


  // перетаскивание ползунка фильтра
  var uploadEffectElement = form.querySelector('.upload-effect-level');

  var filter = {
    'effect-none': function () {
      return '';
    },
    'effect-chrome': function (dragValue) {
      return 'grayscale(' + dragValue / 100 + ')';
    },
    'effect-sepia': function (dragValue) {
      return 'sepia(' + dragValue / 100 + ')';
    },
    'effect-marvin': function (dragValue) {
      return 'invert(' + dragValue + '%)';
    },
    'effect-phobos': function (dragValue) {
      return 'blur(' + dragValue / 100 * MAX_BLUR + 'px)';
    },
    'effect-heat': function (dragValue) {
      return 'brightness(' + dragValue / 100 * MAX_BRIGHTNESS + ')';
    }
  };

  var changeLevelFilters = function (dragValue) {
    var levelFilter = filter[currentFilter](dragValue);
    uploadImagePreview.style.filter = levelFilter;
  };

  window.initializeFilters(uploadEffectElement, changeLevelFilters);

})();
