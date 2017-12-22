'use strict';

(function () {
  var getRandomIndex = function (array) {
    var random = -0.5 + Math.random() * array.length;
    return Math.round(random);
  };
  window.data = {
    getRandomNumber: function (min, max) {
      var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
      randomNumber = Math.round(randomNumber);
      return randomNumber;
    },

    getRandomComments: function (array) {
      var numberOfComments = window.data.getRandomNumber(1, 2);
      var photoComments = [];
      for (var i = 0; i < numberOfComments; i++) {
        var index = getRandomIndex(array);
        photoComments[i] = array[index];
      }
      return photoComments;
    }
  };
})();
