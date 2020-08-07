'use strict';

(function () {
  var MAIN_PIN = {
    width: 65,
    height: 65,
    tail: 15
  };

  var MIN_Y = 130;
  var MAX_Y = 630;
  var MAX_X = 1200;
  var MIN_X = 0;

  var mainPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  var rightLimit = Math.round((parseInt(MAX_X, 10) - (parseInt(MAIN_PIN.width, 10) / 2)));
  var leftLimit = Math.round(MIN_X - (parseInt(MAIN_PIN.width, 10) / 2));
  var topLimit = MIN_Y - MAIN_PIN.height - MAIN_PIN.tail;
  var bottomLimit = MAX_Y - MAIN_PIN.height - MAIN_PIN.tail;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var shiftX = mainPin.offsetLeft - shift.x;
      var shiftY = mainPin.offsetTop - shift.y;

      if (shiftX > rightLimit) {
        shiftX = rightLimit;
      } else if (shiftX < leftLimit) {
        shiftX = leftLimit;
      }

      if (shiftY < topLimit) {
        shiftY = topLimit;
      } else if (shiftY >= bottomLimit) {
        shiftY = bottomLimit;
      }

      mainPin.style.top = shiftY + 'px';
      mainPin.style.left = shiftX + 'px';

      getAddress(true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var getAddress = function (isTail) {
    var fullHeight = isTail ? parseInt(MAIN_PIN.height, 10) + parseInt(MAIN_PIN.tail, 10)
      : Math.round(parseInt(MAIN_PIN.height, 10) / 2);

    address.value = parseInt(mainPin.style.left, 10) + Math.floor(parseInt(MAIN_PIN.width, 10) / 2) + ', '
       + (parseInt(mainPin.style.top, 10) + parseInt(fullHeight, 10));
  };


  window.dnd = {
    getAddress: getAddress
  };

})();
