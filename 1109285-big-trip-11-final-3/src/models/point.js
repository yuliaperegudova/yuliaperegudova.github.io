import {formatOfferTitleToId, formatString, formatOffers} from "../utils/common";

export default class Point {
  constructor(point) {
    this.id = point[`id`];
    this.type = formatString(point[`type`]);
    this.time = {
      eventStartTime: new Date(point[`date_from`]),
      eventEndTime: new Date(point[`date_to`]),
    };
    this.price = point[`base_price`];
    this.offers = point[`offers`].map((offer) => {
      return Object.assign({}, offer, {
        id: formatOfferTitleToId(offer.title)
      });
    });
    this.destination = {
      description: point[`destination`][`description`],
      photos: point[`destination`][`pictures`],
      currentCity: point[`destination`][`name`]
    };
    this.isFavorite = point[`is_favorite`];
  }

  toRAW() {
    return {
      "id": this.id.toString(),
      "type": this.type.toLowerCase(),
      "date_from": this.time.eventStartTime.toISOString(),
      "date_to": this.time.eventEndTime.toISOString(),
      "base_price": parseInt(this.price, 10),
      "offers": this.offers ? formatOffers(this.offers) : null,
      "destination": this.destination ? {
        "name": this.destination.currentCity,
        "pictures": this.destination.photos,
        "description": this.destination.description
      } : null,
      "is_favorite": this.isFavorite
    };
  }

  static parsePoint(point) {
    return new Point(point);
  }

  static parsePoints(points) {
    return points.map(Point.parsePoint);
  }

  static clone(point) {
    return new Point(point.toRAW());
  }
}
