'use strict';

(function () {

  var TIMEOUT = 2000;
  var errorTemplate = document.querySelector('#error-template');
  var errorContainer = document.querySelector('.error-container');


  var renderError = function () {
    var errorElement = errorTemplate.cloneNode(true);
    return errorElement;
  };

  window.onError = function () {
    errorContainer.appendChild(renderError());
    var errorPopup = document.querySelector('.pop-up-error');
    errorPopup.classList.remove('hidden');
    setTimeout(function () {
      errorPopup.classList.add('hidden');
    }, TIMEOUT);
  };
})();
