'use strict';

(function () {

  var picturesElement = document.querySelector('.pictures');
  var children = document.querySelector('.pictures').children;
  var filtersSorting = document.querySelector('.filters');
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
    picturesElement.appendChild(window.picture.render(descriptionPhotos));
    setPicturesClickHandlers(descriptionPhotos);
    filtersSorting.classList.remove('filters-inactive');
  }, window.onError);

  var setPicturesClickHandlers = function (photos) {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      var onPictureClick = getPictureClickHandler(photos[i]);
      pictures[i].addEventListener('click', onPictureClick);
    }
  };


  var changePicturesContent = function () {
    Array.from(children).forEach(function (child) {
      document.querySelector('.pictures').removeChild(child);
    });
  };

  var updatePhotos = function (evt) {
    var filter = evt.target;
    var updatedPhotos;
    if (filter.id === 'filter-popular') {
      updatedPhotos = sortingByLikes();
    }
    if (filter.id === 'filter-discussed') {
      updatedPhotos = sortingByComments();
    }
    if (filter.id === 'filter-recommend') {
      updatedPhotos = defaultSorting();
    }
    if (filter.id === 'filter-random') {
      updatedPhotos = randomSorting();
    }
    debounce(changePicturesContent());
    window.picture.render(updatedPhotos);
    setPicturesClickHandlers(updatedPhotos);
  };

  var sortingByLikes = function () {
    var photosCopy = descriptionPhotos.slice();
    return photosCopy.sort(function (firstPhoto, secondPhoto) {
      if (firstPhoto.likes < secondPhoto.likes) {
        return 1;
      } else if (firstPhoto.likes > secondPhoto.likes) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  var sortingByComments = function () {
    var photosCopy = descriptionPhotos.slice();
    return photosCopy.sort(function (firstPhoto, secondPhoto) {
      if (firstPhoto.comments.length < secondPhoto.comments.length) {
        return 1;
      } else if (firstPhoto.comments.length > secondPhoto.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  var defaultSorting = function () {
    return descriptionPhotos;
  };

  var randomSorting = function () {
    var photosCopy = descriptionPhotos.slice();
    return photosCopy.sort(function () {
      return (Math.random() - 0.5);
    });
  };

  var debounce = function (action) {
    setTimeout(action, 500);
  };

  document.querySelector('.filters').addEventListener('focusin', updatePhotos);

})();
