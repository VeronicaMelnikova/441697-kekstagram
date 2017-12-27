'use strict';

(function () {

  var MIN_VALUE = 0;
  var MAX_VALUE = 100;

  window.initializeFilters = function (uploadEffectElement, changeLevelFilters) {

    var effectDrag = uploadEffectElement.querySelector('.upload-effect-level-pin');
    var filterLevelBar = uploadEffectElement.querySelector('.upload-effect-level-line');
    var levelValue = uploadEffectElement.querySelector('.upload-effect-level-val');
    var filterUploadLevelValue = uploadEffectElement.querySelector('.upload-effect-level-value');

    effectDrag.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX
        };

        startCoords = {
          x: moveEvt.clientX
        };

        var dragValue = (effectDrag.offsetLeft - shift.x) * MAX_VALUE / filterLevelBar.offsetWidth;

        if (dragValue > MIN_VALUE && dragValue < MAX_VALUE) {
          effectDrag.style.left = dragValue + '%';
          levelValue.style.width = dragValue + '%';
          changeLevelFilters(dragValue);
          filterUploadLevelValue.value = dragValue.toFixed();
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  };

})();
