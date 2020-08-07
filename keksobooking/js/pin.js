'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIHGT = 70;
  var list = document.querySelector('.map__pins');

  var pinElementTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderSimilar = function (similarPin) {
    var pinElement = pinElementTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (similarPin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (similarPin.location.y - PIN_HEIHGT) + 'px;';
    pinElement.querySelector('img').src = similarPin.author.avatar;
    pinElement.alt = similarPin.offer.title;

    pinElement.addEventListener('click', function () {
      var pins = document.querySelectorAll('.map__pin');

      pins.forEach(function (it) {
        it.classList.remove('map__pin--active');
      });
      window.card.remove();
      window.card.show(similarPin);
      pinElement.classList.add('map__pin--active');
    });

    return pinElement;
  };

  var render = function (data) {

    var fragment = document.createDocumentFragment();
    data.forEach(function (it) {
      fragment.appendChild(renderSimilar(it));
    });

    list.appendChild(fragment);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (it) {
      if (!it.classList.contains('map__pin--main')) {
        it.remove();
      }
    });
  };

  window.pin = {
    render: render,
    remove: removePins
  };
})();
