'use strict';

(function () {

  var COMMENT_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var PHOTOS_COUNT = 25;

  var pictureTemplate = document.querySelector('#picture-template').content;
  var picturesElement = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

    return pictureElement;
  };

  // заполнение массива с описанием фотографий
  var fillDescriptionPhotos = function () {
    var descriptionPhotos = [];
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      descriptionPhotos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.data.getRandomNumber(15, 200),
        comments: window.data.getRandomComments(COMMENT_LIST)
      };
    }
    return descriptionPhotos;
  };
  window.picture = {
    descriptionPhotos: fillDescriptionPhotos()
  };

  var renderPhotos = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      fragment.appendChild(renderPicture(array[i]));
    }
    return fragment;
  };

  picturesElement.appendChild(renderPhotos(window.picture.descriptionPhotos));
})();
