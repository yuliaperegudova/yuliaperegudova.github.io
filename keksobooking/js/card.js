'use strict';

(function () {

  var HOUSING_TYPE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var map = document.querySelector('.map');
  var mapFiltertsContainer = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderCard = function (similarPin) {

    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = similarPin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = similarPin.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = similarPin.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HOUSING_TYPE[similarPin.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = similarPin.offer.rooms + ' комнаты для ' + similarPin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarPin.offer.checkin + ', выезд до ' + similarPin.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = similarPin.offer.description;
    cardElement.querySelector('.popup__avatar').src = similarPin.author.avatar;

    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupFeatureTemplate = Array.from(popupFeatures.childNodes);
    var features = similarPin.offer.features;

    popupFeatureTemplate.forEach(function (child) {
      if (child.nodeType === 1) {
        if (features.some(function (feature) {
          return child.classList.contains('popup__feature--' + feature);
        })) {
          child.classList.add('popup__feature--visible');
          child.style.display = 'inline-block';
        } else {
          child.classList.remove('popup__feature--visible');
          child.style.display = 'none';
        }
      }
    });

    var photos = similarPin.offer.photos;
    var photoList = cardElement.querySelector('.popup__photos');
    var photoTemplate = cardElement.querySelector('.popup__photo');
    photoList.textContent = '';
    for (var i = 0; i < photos.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = photos[i];
      photoList.appendChild(photo);
    }
    return cardElement;
  };

  var show = function (similarPin) {
    map.insertBefore(renderCard(similarPin), mapFiltertsContainer);

    var cardClose = document.querySelector('.popup__close');
    cardClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    var card = document.querySelector('.popup');
    card.remove();
    document.removeEventListener('keydown', onPopupEscPress);
    var activePin = document.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active');
  };

  var remove = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  window.card = {
    show: show,
    remove: remove
  };

})();
