import moment from "moment";

const checkSuffix = (label) => {
  const modernLabel = label.toUpperCase();
  return modernLabel === `CHECK-IN` ? `CHECK_IN` : modernLabel;
};

const formatString = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD/MM/YYYY`);
};

const formatDateToDefault = (date) => {
  moment.defaultFormat = `DD.MM.YYYY HH:mm`;
  return moment(date, moment.defaultFormat).toDate();
};

const getDurationDate = (startDate, endDate) => {
  return moment.duration(moment(endDate).diff(moment(startDate)));
};

const isFutureDate = (nowDate, eventStartDate) => {
  return eventStartDate > nowDate && !isOneDay(nowDate, eventStartDate);
};

const isPastDate = (nowDate, eventStartDate) => {
  return eventStartDate < nowDate && !isOneDay(nowDate, eventStartDate);
};

const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

const parseDestinationInfo = (destinations, city) => {
  const index = destinations.findIndex((destination) => destination.currentCity === city);
  return index === -1 ? city : destinations[index];
};

const formatOfferTitleToId = (string) => {
  return string.replace(/\s+/g, `-`).toLowerCase();
};

const formatOffers = (offers) => {
  return offers.map((offer) => {
    return {
      title: offer.title,
      price: offer.price,
      required: offer.required
    };
  });
};

const removeComponent = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {removeComponent, formatOffers, formatOfferTitleToId, checkSuffix, formatTime, formatDate, getDurationDate, isFutureDate, isPastDate, formatDateToDefault, formatString, parseDestinationInfo};
