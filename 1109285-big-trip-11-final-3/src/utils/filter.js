import {FilterType} from "../const";
import {isFutureDate, isPastDate} from "./common";

const getFilteredPoints = (points, date, handler) => {
  return points.filter((point) => handler(date, point.time.eventStartTime));
};

const getPointsByFilter = (points, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return getFilteredPoints(points, nowDate, isFutureDate);
    case FilterType.PAST:
      return getFilteredPoints(points, nowDate, isPastDate);
  }

  return points;
};

export {getPointsByFilter};
