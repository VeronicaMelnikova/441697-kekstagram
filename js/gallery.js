'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  window.gellery = {
    onKeyPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.gellery.closePopup();
      }
    },

    openPopup: function () {
      galleryOverlay.classList.remove('hidden');
      document.addEventListener('keydown', window.gellery.onKeyPress);
    },

    closePopup: function () {
      galleryOverlay.classList.add('hidden');
      document.removeEventListener('keydown', window.gellery.onKeyPress);
    }
  };

  //  закрывает просмотр фотографии
  galleryOverlayClose.addEventListener('click', function () {
    window.gellery.closePopup();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.gellery.closePopup();
    }
  });
})();
