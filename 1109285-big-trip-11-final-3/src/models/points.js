import {getPointsByFilter} from "../utils/filter";
import {FilterType} from "../const";

export default class Points {
  constructor() {
    this._points = [];
    this._offersByType = [];
    this._destinations = [];
    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getActiveFilterType() {
    return this._activeFilterType;
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  getPointsAll() {
    return this._points;
  }

  getOffersByType() {
    return this._offersByType;
  }

  getDestinations() {
    return this._destinations;
  }

  setPoints(points) {
    this._points = points ? Array.from(points) : [];
    this._callHandlers(this._dataChangeHandlers);
  }

  setOffersByType(offers) {
    this._offersByType = offers ? new Map() : [];
    for (const item of offers) {
      this._offersByType.set(item.type, item.offers);
    }
  }

  setDestinations(destinations) {
    this._destinations = destinations ? Array.from(destinations) : [];
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  getCurrentPointIndex(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }
    return index;
  }

  updatePoint(id, point) {
    this._points = [].concat(this._points.slice(0, this.getCurrentPointIndex(id)), point, this._points.slice(this.getCurrentPointIndex(id) + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addPoint(point) {
    this._points = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
