import AbstractComponent from "./abstract-component";
import {SortType} from "../const";
import {render} from "../utils/render";

const createTripDaysTemplate = (day, index, sortType = SortType.EVENT) => {
  const month = day[0].time.eventStartTime.toDateString().slice(4, 7).toUpperCase();
  const date = day[0].time.eventStartTime.toDateString().slice(8, 10);
  const dateISOString = day[0].time.eventStartTime.toISOString().slice(0, 10);

  const getDayInfo = (currentSortType) => {
    return currentSortType === SortType.EVENT ? (
      `<span class="day__counter">${index + 1}</span>
      <time class="day__date" datetime="${dateISOString}">${month} ${date}</time>`
    ) : ``;
  };

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
    ${getDayInfo(sortType)}
    </div>

    <ul class="trip-events__list">
    </ul>
   </li>`
  );
};

export default class TripDays extends AbstractComponent {
  constructor(day, index, sortType) {
    super();

    this._day = day;
    this._index = index;
    this._sortType = sortType;
  }

  getTemplate() {
    return createTripDaysTemplate(this._day, this._index, this._sortType);
  }

  renderEventsList(events) {
    events.forEach((event) => {
      render(this.getElement().querySelector(`.trip-events__list`), event);
    });
  }
}
