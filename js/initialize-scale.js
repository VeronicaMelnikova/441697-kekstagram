'use strict';

(function () {

  var UPLOAD_RESIZE_STEP = 25;
  var UPLOAD_RESIZE_MIN = 25;
  var UPLOAD_RESIZE_MAX = 100;

  window.initializeScale = function (scaleElement, setScaleForUploadImage) {
    var uploadResizeField = scaleElement.querySelector('.upload-resize-controls-value');
    var uploadResizeInc = scaleElement.querySelector('.upload-resize-controls-button-inc');
    var uploadResizeDec = scaleElement.querySelector('.upload-resize-controls-button-dec');

    var getScaleValue = function () {
      return parseInt(uploadResizeField.value.slice(0, -1), 10);
    };

    var setScaleValue = function (value) {
      uploadResizeField.value = value + '%';
    };

    var getScaleValueInRange = function (value) {
      return Math.min(UPLOAD_RESIZE_MAX, Math.max(UPLOAD_RESIZE_MIN, value));
    };

    var changeScale = function (step) {
      var currentScaleValue = getScaleValue();
      var newScaleValue = getScaleValueInRange(currentScaleValue + step);
      setScaleValue(newScaleValue);
      setScaleForUploadImage(newScaleValue);
    };

    var onResizeInc = function () {
      changeScale(UPLOAD_RESIZE_STEP);
    };

    var onResizeDec = function () {
      changeScale(-UPLOAD_RESIZE_STEP);
    };

    uploadResizeInc.addEventListener('click', onResizeInc);
    uploadResizeDec.addEventListener('click', onResizeDec);
  };
})();
