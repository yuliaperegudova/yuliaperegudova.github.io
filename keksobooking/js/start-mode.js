'use strict';

(function () {
  var MAIN_PIN_DEFOLT = {
    X: 570,
    Y: 375
  };

  var hideFieldset = function () {
    for (var j = 0; j < window.activeMode.formFieldset.length; j++) {
      window.activeMode.formFieldset[j].setAttribute('disabled', 'disabled');
    }
    return hideFieldset;
  };

  var hideFilters = function () {
    for (var j = 0; j < window.activeMode.allFilters.length; j++) {
      window.activeMode.allFilters[j].setAttribute('disabled', 'disabled');
    }
    return hideFilters;
  };

  var disabledMode = function () {
    hideFieldset();
    hideFilters();
    window.activeMode.mainPin.draggable = false;
    window.dnd.getAddress(false);
    window.activeMode.mainPin.style = 'left:' + MAIN_PIN_DEFOLT.X + 'px; top:' + MAIN_PIN_DEFOLT.Y + 'px';
  };

  disabledMode();

  window.activeMode.mainPin.addEventListener('mousedown', function () {
    if (window.activeMode.mainPin.draggable !== true) {
      window.activeMode.set();
    }
  });

  var onEnterPress = function (evt) {
    window.util.isEnterEvent(evt, function () {
      if (window.activeMode.mainPin.draggable !== true) {
        window.activeMode.set();
      }
      document.removeEventListener('keydown', onEnterPress);
    });
  };

  document.addEventListener('keydown', onEnterPress);

  window.startMode = {
    disabledMode: disabledMode
  };
})();
