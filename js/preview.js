'use strict';

(function () {

  var previewOverlay = document.querySelector('.gallery-overlay-preview');

  window.preview = {
    fillDataOverlay: function (data) {
      previewOverlay.querySelector('.gallery-overlay-image').src = data.url;
      previewOverlay.querySelector('.likes-count').textContent = data.likes;
      previewOverlay.querySelector('.comments-count').textContent = data.comments.length;
    }
  };

})();
