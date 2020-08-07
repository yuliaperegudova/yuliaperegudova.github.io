import AbstractComponent from "./abstract-component";
import {getFullCost, getRoute, getRouteDates} from "../utils/trip-info";

const createTripInfoTemplate = (points) => {
  const route = (points.length > 0) ? getRoute(points) : ``;
  const dates = (points.length > 0) ? getRouteDates(points) : ``;
  const cost = (points.length > 0) ? getFullCost(points) : ``;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>

        <p class="trip-info__dates">${dates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
};

export default class TripInfo extends AbstractComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
  }

  getTemplate() {
    return createTripInfoTemplate(this._pointsModel.getPointsAll());
  }
}
