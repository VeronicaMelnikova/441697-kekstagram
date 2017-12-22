'use strict';

(function () {

  var PHOTOS_COUNT = 25;
  var previewOverlay = document.querySelector('.gallery-overlay-preview');
  var pictures = document.querySelectorAll('.picture');


  // заполняет оверлей данными
  var fillDataOverlay = function (data) {
    previewOverlay.querySelector('.gallery-overlay-image').src = data.url;
    previewOverlay.querySelector('.likes-count').textContent = data.likes;
    previewOverlay.querySelector('.comments-count').textContent = data.comments.length;
  };
  var createFilling = function (object) {
    return function (evt) {
      evt.preventDefault();
      fillDataOverlay(object);
      window.gellery.openPopup();
    };
  };

  var onClickFillOverlay = function () {
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      var fillingPreview = createFilling(window.picture.descriptionPhotos[i]);
      pictures[i].addEventListener('click', fillingPreview);
    }
  };
  onClickFillOverlay();
})();
