'use strict';

(function () {

  var TIMEOUT = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var statusCode = {
    OK: 200
  };

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  function defaultRequest(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  }

  window.load = function (onLoad, onError) {
    var xhr = defaultRequest(onLoad, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var xhr = defaultRequest(onLoad, onError);
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  var onError = function () {
    var removeError = function () {
      errorMessage.removeEventListener('click', removeError);
      errorMessage.remove();
    };
    var errorMessage = errorTemplate.cloneNode(true);
    errorMessage.addEventListener('click', function (evt) {
      if (evt.target === evt.currentTarget) {
        removeError();
      }
    });
    var errorBtn = errorMessage.querySelector('.error__button')[0];
    errorBtn.onclick = function () {
      errorMessage.remove();
      var form = document.querySelector('.ad-form');
      window.upload(new FormData(form), window.backend.onSuccess, window.backend.onError);
    };

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeError);
    });
    document.body.appendChild(errorMessage);
  };

  var onSuccess = function () {
    window.form.reset();
    var removeMessage = function () {
      successMessage.removeEventListener('click', removeMessage);
      successMessage.remove();
    };
    var successMessage = successTemplate.cloneNode(true);
    successMessage.addEventListener('click', function (evt) {
      if (evt.target === evt.currentTarget) {
        removeMessage();
      }
    });

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeMessage);
    });

    document.body.appendChild(successMessage);
  };

  window.backend = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
