import AbstractSmartComponent from "./abstract-smart-component";
import {SortType} from "../const";

const createSortTemplate = (sortType, isDisabled = false) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortType === SortType.EVENT ? `<span class="trip-sort__item  trip-sort__item--day">Day</span>` : `<span class="trip-sort__item  trip-sort__item--day"></span>`}

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.EVENT}" ${sortType === SortType.EVENT ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
        <label class="trip-sort__btn" for="${SortType.EVENT}">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.TIME}" ${sortType === SortType.TIME ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
        <label class="trip-sort__btn" for="${SortType.TIME}">
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.PRICE}" ${sortType === SortType.PRICE ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
        <label class="trip-sort__btn" for="${SortType.PRICE}">
          Price
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Sort extends AbstractSmartComponent {
  constructor() {
    super();

    this._currenSortType = SortType.EVENT;
    this._isNewEventFormOpened = null;
    this._setSortTypeChangeHandler = null;
  }

  getTemplate() {
    return createSortTemplate(this._currenSortType, this._isNewEventFormOpened);
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._setSortTypeChangeHandler);
  }

  setDefaultView() {
    this._currenSortType = SortType.EVENT;
    this._isNewEventFormOpened = true;
    this.rerender();
  }

  removeDisabled() {
    this._isNewEventFormOpened = false;
    this.rerender();
  }

  setCurrentSortType(sortType) {
    this._currenSortType = sortType;
    this.rerender();
  }

  setSortTypeChangeHandler(handler) {
    const sortFilters = this.getElement().querySelectorAll(`input`);
    this._setSortTypeChangeHandler = handler;

    sortFilters.forEach((filter) => {
      filter.addEventListener(`click`, (evt) => {
        const sortType = evt.target.id;
        if (this._currenSortType === sortType) {
          return;
        }
        this._currenSortType = sortType;
        handler(this._currenSortType);
      });
    });
  }
}

