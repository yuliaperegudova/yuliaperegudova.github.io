import {
  checkSuffix,
  formatDate, formatTime, formatString, formatOfferTitleToId, formatDateToDefault
} from "../utils/common";
import {TRANSFER_EVENTS, ACTIVITY_EVENTS, EVENT_TYPES, EventSuffix, DefaultData, Mode} from "../const";
import AbstractSmartComponent from "./abstract-smart-component";
import flatpickr from "flatpickr";
import {encode} from "he";

import "flatpickr/dist/flatpickr.min.css";

const createEventEditTemplate = (newEvent, options = {}) => {
  const {isFavorite} = newEvent;
  const {type, offers, destination, mode, destinations, externalData, price: notSanitizedPrice, time} = options;
  const {description, photos, currentCity: notSanitizedCurrentCity} = destination;
  const {eventStartTime, eventEndTime} = time;

  const price = encode(notSanitizedPrice.toString());
  const currentCity = encode(notSanitizedCurrentCity);

  const deleteButtonText = externalData.DELETE_BTN_TEXT;
  const saveButtonText = externalData.SAVE_BTN_TEXT;

  const renderPhotosMarkup = () => {
    return photos.map((photo) => {
      return (`<img class="event__photo" src="${photo.src}" alt="${photo.description}">`);
    }).join(`\n`);
  };

  const getTypesMarkup = (eventType, isChecked) => {
    return `<div class="event__type-item">
      <input id="event-type-${eventType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}" ${isChecked ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1">${eventType}</label>
    </div>`;
  };

  const renderEventTypesGroupMarkup = (start, end) => {
    return EVENT_TYPES.slice(start, end).map((eventType) => {
      return getTypesMarkup(eventType, eventType === formatString(type));
    }).join(`\n`);
  };

  const renderDestinationsMarkup = () => {
    return destinations.map((currentDestination) => {
      return (
        `<option value="${currentDestination.currentCity}"></option>`
      );
    }).join(`\n`);
  };

  const renderDestinationDescriptionMarkup = () => {
    return description && photos && currentCity ? (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${renderPhotosMarkup()}
          </div>
        </div>
      </section>`
    ) : ``;
  };

  const generateOffers = () => {
    return offers.map((offer) => {
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer" value="${offer.id}" ${offer.required ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.id}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
  };

  const checkOffers = () => {
    return generateOffers() !== `` ? (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${generateOffers()}
        </div>
      </section>`
    ) : ``;
  };

  const checkEventMode = () => {
    return mode !== Mode.ADDING ? (
      `<button class="event__reset-btn" type="reset">${deleteButtonText}</button>
      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
      </label>`
    ) : `<button class="event__reset-btn" type="reset">Cancel</button>`;
  };

  return (
    `<li><form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${renderEventTypesGroupMarkup(0, TRANSFER_EVENTS)}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${renderEventTypesGroupMarkup(TRANSFER_EVENTS, ACTIVITY_EVENTS)}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${formatString(type)} ${EventSuffix[checkSuffix(type)]}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentCity}" list="destination-list-1" required autocomplete="off">
                <datalist id="destination-list-1">
                  ${renderDestinationsMarkup()}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(eventStartTime)} ${formatTime(eventStartTime)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(eventEndTime)} ${formatTime(eventEndTime)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" pattern="^[0-9]+$" title="Разрешены только числовые значения" required>
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">${saveButtonText}</button>
              ${checkEventMode()}
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Close event</span>
              </button>
            </header>
            <section class="event__details">
              ${checkOffers()}
              ${renderDestinationDescriptionMarkup()}
            </section>
          </form></li>`
  );
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event, mode, pointsModel) {
    super();

    this._pointsModel = pointsModel;
    this._offersByType = this._pointsModel.getOffersByType();
    this._destinations = this._pointsModel.getDestinations();
    this._mode = mode;
    this._event = event;
    this._eventType = event.type;
    this._eventOffers = event.offers.slice();
    this._eventDestination = Object.assign({}, event.destination);
    this._eventStartDate = event.time.eventStartTime;
    this._eventEndDate = event.time.eventEndTime;
    this._eventPrice = event.price;
    this._externalData = DefaultData;
    this._submitHandler = null;
    this._favoriteBtnHandler = null;
    this._flatpickrStartTime = null;
    this._flatpickrEndTime = null;
    this._deleteButtonClickHandler = null;
    this._closeButtonClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEditTemplate(this._event, {
      type: this._eventType,
      offers: this._eventOffers,
      destination: this._eventDestination,
      mode: this._mode,
      destinations: this._destinations,
      externalData: this._externalData,
      price: this._eventPrice,
      time: {
        eventStartTime: this._eventStartDate,
        eventEndTime: this._eventEndDate
      }
    });
  }

  removeElement() {
    if (this._flatpickrStartTime) {
      this._flatpickrStartTime.destroy();
      this._flatpickrStartTime = null;
    }
    if (this._flatpickrEndTime) {
      this._flatpickrEndTime.destroy();
      this._flatpickrEndTime = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteBtnHandler(this._favoriteBtnHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const event = this._event;

    this._eventType = event.type;
    this._eventOffers = event.offers.slice();
    this._destinations = this._pointsModel.getDestinations();
    this._eventStartDate = event.time.eventStartTime;
    this._eventEndDate = event.time.eventEndTime;
    this._eventPrice = event.price;
    this._offersByType = this._pointsModel.getOffersByType();

    this.rerender();
  }

  getData() {
    const form = this.getElement().querySelector(`form`);
    return new FormData(form);
  }

  getCurrentMode() {
    return this._mode;
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  setDisable() {
    this.getElement().querySelectorAll(`input`)
      .forEach((input) => input.setAttribute(`disabled`, `true`));
    this.getElement().querySelectorAll(`button`)
      .forEach((btn) => btn.setAttribute(`disabled`, `true`));
  }

  setRedBorder() {
    this.getElement().querySelector(`form`).style.border = `2px solid red`;
  }

  removeRedBorder() {
    this.getElement().querySelector(`form`).style.border = ``;
  }

  removeDisable() {
    this.getElement().querySelectorAll(`input`)
      .forEach((input) => input.removeAttribute(`disabled`));
    this.getElement().querySelectorAll(`button`)
      .forEach((btn) => btn.removeAttribute(`disabled`));
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoriteBtnHandler(handler) {
    if (this._mode === Mode.ADDING) {
      return;
    }
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoriteBtnHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);

    this._closeButtonClickHandler = handler;
  }

  _makeFlatpickrElement(eventDate, minDate, maxDate) {
    return {
      altInput: true,
      allowInput: true,
      enableTime: true,
      [`time_24hr`]: true,
      dateFormat: `d/m/Y H:i`,
      altFormat: `d/m/Y H:i`,
      defaultDate: eventDate,
      minDate,
      maxDate,
    };
  }

  setFlatpickr(dateElement, eventDate) {
    if (dateElement.id.match(/(start)/g)) {
      this._flatpickrStartTime = flatpickr(dateElement, this._makeFlatpickrElement(eventDate, null, null));
    } else {
      this._flatpickrEndTime = flatpickr(dateElement, this._makeFlatpickrElement(eventDate, this._eventStartDate, null));
    }
  }

  _applyFlatpickr() {
    if (this._flatpickrStartTime) {
      this._flatpickrStartTime.destroy();
      this._flatpickrStartTime = null;
    }
    if (this._flatpickrEndTime) {
      this._flatpickrEndTime.destroy();
      this._flatpickrEndTime = null;
    }

    const dateStartElement = this.getElement().querySelector(`#event-start-time-1`);
    this.setFlatpickr(dateStartElement, this._eventStartDate);
    const dateEndElement = this.getElement().querySelector(`#event-end-time-1`);
    this.setFlatpickr(dateEndElement, this._eventEndDate);
  }

  _subscribeOnEvents() {
    const element = this.getElement().querySelector(`form`);

    const eventTypeList = element.querySelector(`.event__type-list`);
    const eventDestination = element.querySelector(`#event-destination-1`);
    const eventOffersList = element.querySelector(`.event__available-offers`);
    const eventPrice = element.querySelector(`.event__input--price`);
    const startTime = element.querySelector(`#event-start-time-1`);
    const endTime = element.querySelector(`#event-end-time-1`);
    const validityEndTimeInput = element.querySelectorAll(`.event__input--time`)[3];

    eventPrice.addEventListener(`input`, (evt) => {
      this._eventPrice = evt.target.value;
    });

    startTime.addEventListener(`change`, (evt) => {
      this._eventStartDate = formatDateToDefault(evt.target.value);
      if (this._eventEndDate < this._eventStartDate) {
        this._eventEndDate = this._eventStartDate;
      }
      this.rerender();
    });

    endTime.addEventListener(`change`, (evt) => {
      this._eventEndDate = formatDateToDefault(evt.target.value);
      this.rerender();
    });

    element.addEventListener(`click`, () => {
      if (validityEndTimeInput) {
        if (this._eventEndDate < this._eventStartDate) {
          validityEndTimeInput.setCustomValidity(`Дата окончания не может быть меньше даты начала`);
          validityEndTimeInput.reportValidity();
        } else {
          validityEndTimeInput.setCustomValidity(``);
        }
      }
    });

    eventTypeList.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this._eventType = evt.target.value;
      this._eventOffers = this._offersByType.get(evt.target.value).map((offer) => {
        return Object.assign({}, offer, {
          id: formatOfferTitleToId(offer.title),
          required: false
        });
      });
      this.rerender();
    });

    eventDestination.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      const index = this._destinations.findIndex((destination) => destination.currentCity === evt.target.value);
      if (index === -1) {
        eventDestination.setCustomValidity(`Выберите город из списка`);
        return;
      }
      this._eventDestination = this._destinations[index];
      this.rerender();
    });

    if (eventOffersList) {
      eventOffersList.addEventListener(`change`, (evt) => {
        const offer = element.querySelector(`#event-offer-${evt.target.value}-1`);
        offer.toggleAttribute(`checked`);

        const checkedOffers = Array.from(eventOffersList.querySelectorAll(`input`)).map((currentOffer) => {
          if (currentOffer.hasAttribute(`checked`)) {
            return currentOffer.value;
          } else {
            return null;
          }
        });

        this._eventOffers = this._eventOffers.map((currentOffer) => {
          if (checkedOffers.includes(currentOffer.id)) {
            return Object.assign({}, currentOffer, {required: true});
          } else {
            return Object.assign({}, currentOffer, {required: false});
          }
        });
      });
    }
  }
}
