import Event from "../components/event";
import EventEdit from "../components/event-edit";
import {replace, remove} from "../utils/render";
import {formatDateToDefault, formatString, parseDestinationInfo, removeComponent} from "../utils/common";
import Point from "../models/point";
import {SHAKE_ANIMATION_TIMEOUT, Mode} from "../const";

export const EmptyPoint = {
  id: Math.random(),
  type: `taxi`,
  time: {
    eventStartTime: new Date(),
    eventEndTime: new Date(),
  },
  price: 0,
  offers: [],
  destination: {
    description: ``,
    photos: {
      src: ``,
      description: ``
    },
    currentCity: ``
  },
  isFavorite: false
};

const parseFormData = (formData, destinations, offersByType, eventData) => {
  const choosenType = formatString(formData.get(`event-type`));

  const reduseDefaultOffers = offersByType.get(formData.get(`event-type`))
    .reduce((acc, offer) => {
      acc[offer.id] = false;
      return acc;
    }, {});

  const reduseChoosenOffers = formData.getAll(`event-offer`).reduce((acc, offer) => {
    acc[offer] = true;
    return acc;
  }, reduseDefaultOffers);

  const formatChoosenOffers = () => {
    const offers = [];
    offersByType.get(formData.get(`event-type`)).forEach((offer) => {
      for (const offerId in reduseChoosenOffers) {
        if (offer.id === offerId) {
          offers.push(Object.assign({}, offer, {
            id: offerId,
            required: reduseChoosenOffers[offerId]
          }));
        }
      }
    });
    return offers;
  };

  const currentEventDestination = parseDestinationInfo(destinations, formData.get(`event-destination`));

  return new Point({
    "id": eventData.id,
    "type": choosenType,
    "destination": {
      "name": currentEventDestination.currentCity,
      "pictures": currentEventDestination.photos,
      "description": currentEventDestination.description
    },
    "date_from": formatDateToDefault(formData.get(`event-start-time`)),
    "date_to": formatDateToDefault(formData.get(`event-end-time`)),
    "base_price": formData.get(`event-price`),
    "is_favorite": !!formData.get(`event-favorite`),
    "offers": formatChoosenOffers()
  });
};

export default class PointController {
  constructor(onDataChange, onViewChange, pointsModel) {
    this._currentEvent = null;
    this._eventEditComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._pointsModel = pointsModel;
    this._offersByType = this._pointsModel.getOffersByType();
    this._destinations = this._pointsModel.getDestinations();
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode, newEventBtn) {
    const oldEventComponent = this._currentEvent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;
    this._button = newEventBtn;

    this._currentEvent = new Event(event);
    this._eventEditComponent = new EventEdit(event, this._mode, this._pointsModel);

    this._currentEvent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setCloseButtonClickHandler(() => { // здесь глянуть
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, event, null, false, this._button);
        return;
      }
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setFavoriteBtnHandler(() => {
      this._eventEditComponent.removeRedBorder();
      const newPoint = Point.clone(event);
      newPoint.isFavorite = !newPoint.isFavorite;
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._eventEditComponent.getData();
      const data = parseFormData(formData, this._destinations, this._offersByType, event);

      this._eventEditComponent.setData({
        saveButtonText: `Saving...`,
      });
      this._eventEditComponent.setDisable();
      this._eventEditComponent.removeRedBorder();
      document.removeEventListener(`keydown`, this._onEscKeyDown);

      return mode === Mode.ADDING ? this._onDataChange(this, event, data, false, this._button) : this._onDataChange(this, event, data);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._eventEditComponent.setData({
        deleteButtonText: `Deleting...`
      });
      this._eventEditComponent.setDisable();
      this._eventEditComponent.removeRedBorder();
      return mode === Mode.ADDING ? this._onDataChange(this, event, null, false, this._button) : this._onDataChange(this, event, null);
    });

    if (mode === Mode.DEFAULT) {
      if (oldEventEditComponent && oldEventComponent) {
        replace(this._currentEvent, oldEventComponent);
        replace(this._eventEditComponent, oldEventEditComponent);
        remove(oldEventComponent);
        remove(oldEventEditComponent);
        this._replaceEditToEvent();
      }
      return this._currentEvent;
    } else if (mode === Mode.ADDING) {
      if (oldEventEditComponent && oldEventComponent) {
        remove(oldEventComponent);
        remove(oldEventEditComponent);
      }
      document.addEventListener(`keydown`, this._onEscKeyDown);
      return this._eventEditComponent;
    }
    return this._currentEvent;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._currentEvent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._currentEvent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._currentEvent.getElement().style.animation = ``;
      this._eventEditComponent.removeDisable();

      this._eventEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);

    setTimeout(() => this._eventEditComponent.setRedBorder(), SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._currentEvent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();
    if (document.contains(this._eventEditComponent.getElement())) {
      if (this._eventEditComponent.getCurrentMode() === Mode.ADDING) {
        removeComponent(this._eventEditComponent);
        return;
      }
      replace(this._currentEvent, this._eventEditComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null, false, this._button);
      }
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
