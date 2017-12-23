'use strict';

(function () {

  var pictures = document.querySelectorAll('.picture');

  var getPictureClickHandler = function (object) {
    return function (evt) {
      evt.preventDefault();
      window.preview.fillDataOverlay(object);
      window.preview.openPopup();
    };
  };

  var setPicturesClickHandlers = function () {
    for (var i = 0; i < pictures.length; i++) {
      var onPictureClick = getPictureClickHandler(window.data.descriptionPhotos[i]);
      pictures[i].addEventListener('click', onPictureClick);
    }
  };
  setPicturesClickHandlers();

})();
