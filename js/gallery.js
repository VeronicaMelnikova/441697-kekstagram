'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var descriptionPhotos = [];

  var getPictureClickHandler = function (object) {
    return function (evt) {
      evt.preventDefault();
      window.preview.fillDataOverlay(object);
      window.preview.openPopup();
    };
  };

  window.backend.load(function (photos) {
    descriptionPhotos = photos;
    picturesContainer.appendChild(window.picture.render(descriptionPhotos));
    setPicturesClickHandlers(descriptionPhotos);
    filters.classList.remove('filters-inactive');
  }, window.onError);

  var setPicturesClickHandlers = function (photos) {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      var onPictureClick = getPictureClickHandler(photos[i]);
      pictures[i].addEventListener('click', onPictureClick);
    }
  };


  var removePicturesContent = function () {
    Array.from(picturesContainer.children).forEach(function (child) {
      picturesContainer.removeChild(child);
    });
  };

  var updatePhotos = function (evt) {
    var filter = evt.target;
    var updatedPhotos;
    if (filter.id === 'filter-popular') {
      updatedPhotos = sortByLikes();
    }
    if (filter.id === 'filter-discussed') {
      updatedPhotos = sortByComments();
    }
    if (filter.id === 'filter-recommend') {
      updatedPhotos = sortByDefault();
    }
    if (filter.id === 'filter-random') {
      updatedPhotos = sortByRandom();
    }
    removePicturesContent();
    window.picture.render(updatedPhotos);
    setPicturesClickHandlers(updatedPhotos);
  };

  var sortByLikes = function () {
    var photosCopy = descriptionPhotos.slice();
    return photosCopy.sort(function (firstPhoto, secondPhoto) {
      return secondPhoto.likes - firstPhoto.likes;
    });
  };

  var sortByComments = function () {
    var photosCopy = descriptionPhotos.slice();
    return photosCopy.sort(function (firstPhoto, secondPhoto) {
      return secondPhoto.comments.length - firstPhoto.comments.length;
    });
  };

  var sortByDefault = function () {
    return descriptionPhotos;
  };

  var sortByRandom = function () {
    var photosCopy = descriptionPhotos.slice();
    return photosCopy.sort(function () {
      return (Math.random() - 0.5);
    });
  };

  var debounce = function (action) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(action, DEBOUNCE_INTERVAL);
  };

  document.querySelector('.filters').addEventListener('click', function (evt) {
    if (evt.target.tagName === 'INPUT') {
      debounce(function () {
        updatePhotos(evt);
      });
    }
  });

})();
