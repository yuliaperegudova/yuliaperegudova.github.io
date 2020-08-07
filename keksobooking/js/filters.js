'use strict';

(function () {
  var MAX_AMOUNT = 5;
  var FILTER_DEFAULT = 'any';

  var PRICE = {
    low: 10000,
    high: 50000
  };

  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');

  var priceLevel = {
    'low': function (price) {
      return price < PRICE.low;
    },
    'middle': function (price) {
      return price >= PRICE.low && price <= PRICE.high;
    },
    'high': function (price) {
      return price > PRICE.high;
    }
  };

  var filterByType = function (type, data) {
    return type.value !== FILTER_DEFAULT ? type.value === data.offer.type : true;
  };

  var filterByPrice = function (price, data) {
    return price.value !== FILTER_DEFAULT ? priceLevel[price.value](data.offer.price) : true;
  };

  var filterByRooms = function (rooms, data) {
    return rooms.value !== FILTER_DEFAULT ? parseInt(rooms.value, 10) === data.offer.rooms : true;
  };

  var filterByGuests = function (guests, data) {
    return guests.value !== FILTER_DEFAULT ? parseInt(guests.value, 10) === data.offer.guests : true;
  };

  var filterByFeatures = function (features, data) {
    var flag = true;
    features.forEach(function (feature) {
      flag = flag && data.offer.features.includes(feature.value);
    });
    return flag;
  };

  var updateFilters = function (allPins) {
    var featuresChecked = filters.querySelectorAll('.map__checkbox:checked');
    var filteredPins = [];

    for (var i = 0; i < allPins.length; i++) {
      if (filteredPins.length === MAX_AMOUNT) {
        break;
      } else if (filterByType(housingType, allPins[i]) &&
          filterByPrice(housingPrice, allPins[i]) &&
          filterByRooms(housingRooms, allPins[i]) &&
          filterByGuests(housingGuests, allPins[i]) &&
          filterByFeatures(featuresChecked, allPins[i])) {
        filteredPins.push(allPins[i]);
      }
    }

    return filteredPins;
  };

  var resetFilters = function () {
    filters.reset();
  };

  window.filters = {
    update: updateFilters,
    reset: resetFilters
  };
})();
