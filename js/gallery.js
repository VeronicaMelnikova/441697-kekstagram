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
    var descriptionPhotos = photos;
    picturesElement.appendChild(window.picture.renderPhotos(descriptionPhotos));
    setPicturesClickHandlers(descriptionPhotos);
  }, window.onError);

  var setPicturesClickHandlers = function (descriptionPhotos) {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      var onPictureClick = getPictureClickHandler(descriptionPhotos[i]);
      pictures[i].addEventListener('click', onPictureClick);
    }
  };

})();
