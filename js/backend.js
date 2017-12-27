'use strict';

(function () {

  var URL_DATA = 'https://js.dump.academy/kekstagram/data';
  var URL_SERVER = 'https://js.dump.academy/kekstagram';
  var TIME = 10000;

  window.upload = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', URL_DATA);
    xhr.send(data);
  };


  window.download = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME;

    xhr.open('GET', URL_SERVER);
    xhr.send();
  };
})();
