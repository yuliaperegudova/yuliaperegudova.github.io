'use strict';

(function () {
  var allPins = [];

  var errorPopupTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var mainBlock = document.querySelector('main');

  var onSuccess = function (data) {
    window.data.allPins = data;
    window.pin.render(window.filters.update(window.data.allPins));
  };

  var onError = function (message) {
    createErrorPopup(message);
  };

  var load = function () {
    window.load(onSuccess, onError);
  };

  var createErrorPopup = function (errorMessage) {
    var errorPopup = errorPopupTemplate.cloneNode(true);

    mainBlock.appendChild(errorPopup);
    errorPopup.querySelector('.error__message').textContent = errorMessage;
    errorPopup.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var onErrorClick = function () {
    closeErrorPopup();
  };

  var onErrorEscPress = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
      closeErrorPopup();
    }
  };

  var closeErrorPopup = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var updatePins = function () {
    window.pin.remove();
    window.card.remove();
    window.pin.render(window.filters.update(window.data.allPins));
  };

  window.data = {
    allPins: allPins,
    updatePins: updatePins,
    load: load,
    createErrorPopup: createErrorPopup
  };
})();
