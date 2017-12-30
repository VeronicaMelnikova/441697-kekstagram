'use strict';

(function () {

  var TIMEOUT = 2000;
  var errorTemplate = document.querySelector('#error-template');
  var errorContainer = document.querySelector('.error-container');


  var renderError = function () {
    var errorElement = errorTemplate.content.cloneNode(true);
    return errorElement;
  };

  window.onError = function () {
    errorContainer.appendChild(renderError());
    setTimeout(function () {
      errorContainer.innerHTML = '';
    }, TIMEOUT);
  };
})();
