'use strict';

(function () {

  var COMMENT_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var PHOTOS_COUNT = 25;

  var getRandomIndex = function (array) {
    var random = -0.5 + Math.random() * array.length;
    return Math.round(random);
  };

  var getRandomNumber = function (min, max) {
    var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
    randomNumber = Math.round(randomNumber);
    return randomNumber;
  };

  var getRandomComments = function (array) {
    var numberOfComments = getRandomNumber(1, 2);
    var photoComments = [];
    for (var i = 0; i < numberOfComments; i++) {
      var index = getRandomIndex(array);
      photoComments[i] = array[index];
    }
    return photoComments;
  };

  var fillDescriptionPhotos = function () {
    var descriptionPhotos = [];
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      descriptionPhotos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomNumber(15, 200),
        comments: getRandomComments(COMMENT_LIST)
      };
    }
    return descriptionPhotos;
  };

  window.data = {
    descriptionPhotos: fillDescriptionPhotos()
  };
})();
