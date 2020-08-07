import {MAX_SHOWING_OFFERS, monthMap, DEFAULT_RADIX} from "../const";

const getSummOffers = (offers) => {
  return offers.length > 0 ? offers
    .map((offer) => {
      return {
        required: offer.required === undefined ? false : offer.required,
        price: parseInt(offer.price, DEFAULT_RADIX)
      };
    })
    .map((offer) => {
      if (offer.required) {
        return offer.price;
      }
      return 0;
    }) : [];
};

const getFullCost = (points) => {
  const offersSum = points ? points
    .slice()
    .map((event) => getSummOffers(event.offers))
    .filter((item) => item.length !== 0)
    .map((offer) => {
      return offer.map((price) => price !== undefined ? price : 0)
        .reduce((acc, event) => acc + event);
    }) : [];
  const allOffersSum = offersSum.length > 0 ? offersSum.reduce((acc, event) => acc + event) : 0;
  return points ? points
    .slice()
    .map((event) => event.price)
    .reduce((acc, event) => acc + event) + allOffersSum : 0;
};

const getRoute = (points) => {
  points = points.slice().sort((a, b) => Date.parse(a.time.eventStartTime) - Date.parse(b.time.eventStartTime));

  const cities = new Set(points
    .slice()
    .map((point) => point.destination.currentCity)
  );

  let route = Array.from(cities);

  if (route.length <= MAX_SHOWING_OFFERS) {
    route = route
      .map((city) => `${city}`)
      .join(` — `);
  } else {
    route = [route[0], route[route.length - 1]]
      .map((city) => `${city}`)
      .join(` — ... — `);
  }

  return route;
};

const getRouteDates = (points) => {
  let dates = points.slice().sort((a, b) => Date.parse(a.time.eventStartTime) - Date.parse(b.time.eventStartTime));
  dates = [dates[0].time.eventStartTime, dates[dates.length - 1].time.eventEndTime];

  const getDateStartString = () => {
    return `${monthMap.get(dates[0].getMonth())} ${dates[0].getDate()}`;
  };

  const getDateFinishString = () => {
    return monthMap.get(dates[0].getMonth()) === monthMap.get(dates[1].getMonth()) ?
      `${dates[1].getDate()}` :
      `${monthMap.get(dates[1].getMonth())} ${dates[1].getDate()}`;
  };

  return `${getDateStartString()} - ${getDateFinishString()}`;
};

export {getFullCost, getRoute, getRouteDates};
