'use strict';

(function () {


  var picturesElement = document.querySelector('.pictures');

  var getPictureClickHandler = function (object) {
    return function (evt) {
      evt.preventDefault();
      window.preview.fillDataOverlay(object);
      window.preview.openPopup();
    };
  };

  window.backend.load(function (photos) {
    window.data = {
      descriptionPhotos: photos
    };
    picturesElement.appendChild(window.picture.renderPhotos(window.data.descriptionPhotos));
    setPicturesClickHandlers();
  }, console.error);

  var setPicturesClickHandlers = function () {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      var onPictureClick = getPictureClickHandler(window.data.descriptionPhotos[i]);
      pictures[i].addEventListener('click', onPictureClick);
    }
  };


})();
