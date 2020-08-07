'use strict';

(function () {

  var MAX_ROOM_VALUE = 100;
  var MIN_CAPACITY_VALUE = 0;

  var TITLE_LENGTH = {
    min: 30,
    max: 100
  };

  var TYPE_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var BORDER_COLOR = {
    valid: '#d9d9d3',
    invalid: '#ff0000'
  };

  var titleInput = document.querySelector('#title');
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  var setBorder = function (element, color) {
    element.style.border = '1px solid' + color;
  };

  var checkTitle = function () {
    if (titleInput.value.length < TITLE_LENGTH.min) {
      titleInput.setCustomValidity('Слишком короткое название');
      setBorder(titleInput, BORDER_COLOR.invalid);
    } else if (titleInput.value.length > TITLE_LENGTH.max) {
      titleInput.setCustomValidity('Слишком длинное название');
      setBorder(titleInput, BORDER_COLOR.invalid);
    } else {
      titleInput.setCustomValidity('');
      setBorder(titleInput, BORDER_COLOR.valid);
    }
  };

  titleInput.addEventListener('change', checkTitle);

  typeInput.addEventListener('change', function () {
    priceInput.min = TYPE_PRICE[typeInput.value];
    priceInput.placeholder = TYPE_PRICE[typeInput.value];
  });

  var checkTypeAndPrice = function () {
    var type = typeInput;
    var price = priceInput;
    var priceValue = +price.value;

    if (priceValue < TYPE_PRICE[type.value]) {
      price.setCustomValidity('Минимальная цена: ' + TYPE_PRICE[type.value]);
      setBorder(price, BORDER_COLOR.invalid);
    } else {
      price.setCustomValidity('');
      setBorder(price, BORDER_COLOR.valid);
    }
  };

  typeInput.addEventListener('change', checkTypeAndPrice);
  priceInput.addEventListener('input', checkTypeAndPrice);

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var timeOutOptions = timeOut.querySelectorAll('option');
  var timeInOptions = timeIn.querySelectorAll('option');

  timeIn.addEventListener('change', function (evt) {
    for (var i = 0; i < timeInOptions.length; i++) {
      if (evt.target.value === timeOutOptions[i].value) {
        timeOutOptions[i].selected = true;
      }
    }
  });

  timeOut.addEventListener('change', function (evt) {
    for (var i = 0; i < timeOutOptions.length; i++) {
      if (evt.target.value === timeInOptions[i].value) {
        timeInOptions[i].selected = true;
      }
    }
  });

  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var checkGuestsAndRooms = function () {
    var rooms = +roomNumberSelect.value;
    var guests = +capacitySelect.value;

    if ((rooms < guests) && (rooms !== MAX_ROOM_VALUE) && (guests !== MIN_CAPACITY_VALUE)) {
      capacitySelect.setCustomValidity('Максимальное число гостей: ' + rooms);
      setBorder(capacitySelect, BORDER_COLOR.invalid);
    } else if ((rooms === MAX_ROOM_VALUE) && (guests !== MIN_CAPACITY_VALUE)) {
      capacitySelect.setCustomValidity('Не для гостей');
      setBorder(capacitySelect, BORDER_COLOR.invalid);
    } else if ((guests === MIN_CAPACITY_VALUE) && (rooms !== MAX_ROOM_VALUE)) {
      capacitySelect.setCustomValidity('Размещение невозможно. Выберите большее количество комнат');
      setBorder(capacitySelect, BORDER_COLOR.invalid);
    } else {
      capacitySelect.setCustomValidity('');
      setBorder(capacitySelect, BORDER_COLOR.valid);
    }
  };

  roomNumberSelect.addEventListener('change', checkGuestsAndRooms);
  capacitySelect.addEventListener('change', checkGuestsAndRooms);
  checkGuestsAndRooms();

  var removePins = function () {
    var renderedPins = document.querySelectorAll('.map__pin');
    var mainPin = document.querySelector('.map__pin--main');
    renderedPins.forEach(function (it) {
      if (it !== mainPin) {
        it.remove();
      }
      mainPin.draggable = false;
    });
  };

  var reset = function () {
    form.reset();
    window.filters.reset();
    form.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    removePins();
    window.startMode.disabledMode();
    window.card.remove();
    window.dnd.getAddress(false);
  };

  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), window.backend.onSuccess, window.data.createErrorPopup);
    evt.preventDefault();
  });

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    reset();
  });

  window.form = {
    reset: reset
  };

})();
