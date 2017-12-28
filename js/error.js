'use strict';

(function () {

  var errorPopUp = document.querySelector('#error-template');

  window.onError = function () {
    errorPopUp.classList.remove('hidden');
    setTimeout(function () {
      errorPopUp.classList.add('hidden');
    }, 2000);
  };
})();
