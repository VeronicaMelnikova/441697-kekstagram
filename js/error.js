'use strict';

(function () {

  var TIMEOUT = 2000;
  var errorTemplate = document.querySelector('#error-template');
  var errorContainer = document.querySelector('.error-container');


  var renderError = function () {
    var errorElement = errorTemplate.content.cloneNode(true);
    return errorElement;
  };

  var errorPopup = renderError();

  window.onError = function () {
    errorContainer.appendChild(errorPopup);
    setTimeout(function () {
      errorContainer.innerHTML = '';
    }, TIMEOUT);
  };
})();
