'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  var previewOverlay = document.querySelector('.gallery-overlay-preview');

  var onKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onKeyPress);
  };

  galleryOverlayClose.addEventListener('click', function () {
    closePopup();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  window.preview = {
    fillDataOverlay: function (data) {
      previewOverlay.querySelector('.gallery-overlay-image').src = data.url;
      previewOverlay.querySelector('.likes-count').textContent = data.likes;
      previewOverlay.querySelector('.comments-count').textContent = data.comments.length;
    },

    openPopup: function () {
      galleryOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onKeyPress);
    }
  };

})();
