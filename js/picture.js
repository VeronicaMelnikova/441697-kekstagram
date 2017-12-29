'use strict';

(function () {

  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content;

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

    return pictureElement;
  };
  var render = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPicture(array[i]));
    }
    picturesContainer.appendChild(fragment);
    return fragment;
  };

  window.picture = {
    render: render
  };

})();
