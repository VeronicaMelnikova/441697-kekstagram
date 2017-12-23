'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  var pictures = document.querySelectorAll('.picture');

  var onKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onKeyPress());
  };

  galleryOverlayClose.addEventListener('click', function () {
    closePopup();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  var getPictureClickHandler = function (object) {
    return function (evt) {
      evt.preventDefault();
      window.preview.fillDataOverlay(object);
      window.gallery.openPopup();
    };
  };

  var setPicturesClickHandlers = function () {
    for (var i = 0; i < pictures.length; i++) {
      var onPictureClick = getPictureClickHandler(window.data.descriptionPhotos[i]);
      pictures[i].addEventListener('click', onPictureClick);
    }
  };
  setPicturesClickHandlers();

  window.gallery = {
    openPopup: function () {
      galleryOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onKeyPress());
    }
  };
})();
