import Point from "../models/point";
import {formatOfferTitleToId} from "../utils/common";
import {Method} from "../const";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({
      url: `points`
    })
      .then((responce) => responce.json())
      .then(Point.parsePoints);
  }

  getDestinations() {
    return this._load({
      url: `destinations`
    })
      .then((response) => response.json());
  }

  getOffers() {
    return this._load({
      url: `offers`
    })
      .then((response) => response.json());
  }

  getData() {
    return Promise.all([
      this.getPoints(),
      this.getDestinations(),
      this.getOffers(),
    ])
      .then((response) => {
        const [events, destinations, offers] = response;
        const formatDestinations = destinations.map((destination) => {
          return {
            currentCity: destination.name,
            description: destination.description,
            photos: destination.pictures
          };
        });
        const formatOffers = offers.map((item) => {
          return {
            type: item.type,
            offers: item.offers.map((offer) => {
              return Object.assign({}, offer, {
                id: formatOfferTitleToId(offer.title),
                required: false
              });
            })
          };
        });
        return {
          events,
          destinations: formatDestinations,
          offers: formatOffers,
        };
      });
  }

  createPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  updatePoint(id, point) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  deletePoint(id) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  sync(points) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(points),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
