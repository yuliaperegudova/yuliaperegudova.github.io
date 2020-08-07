const TRANSFER_EVENTS = 7;
const ACTIVITY_EVENTS = 10;
const MAX_ISO_STRING_LENGTH = 16;
const MAX_SHOWING_OFFERS = 3;
const FIRST_DAY_COUNTER = 1;
const SHAKE_ANIMATION_TIMEOUT = 600;
const HIDDEN_CLASS = `visually-hidden`;
const FILTER_ID_PREFIX = `filter-`;
const BAR_HEIGHT = 55;
const AUTHORIZATION = `Basic Fhngkgffltlfaasdkgbbfdjd`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const MIN_BAR_LENGTH = 50;
const BAR_THICKNESS = 44;
const DATALABELS_SIZE = 13;
const TITLE_FONT_SIZE = 23;
const TICKS_PADDING = 5;
const TICKS_FONT_SIZE = 13;
const MONEY_TIME_SPENT_CHART_FACTOR = 7;
const TRANSPORT_CHART_FACTOR = 5;
const DEFAULT_RADIX = 10;

const monthMap = new Map([
  [0, `JAN`],
  [1, `FEB`],
  [2, `MAR`],
  [3, `APR`],
  [4, `MAY`],
  [5, `JUN`],
  [6, `JUL`],
  [7, `AUG`],
  [8, `SEP`],
  [9, `OCT`],
  [10, `NOV`],
  [11, `DEC`],
]);

const EventType = {
  TAXI: `Taxi`,
  BUS: `Bus`,
  TRAIN: `Train`,
  SHIP: `Ship`,
  TRANSPORT: `Transport`,
  DRIVE: `Drive`,
  FLIGHT: `Flight`,
  CHECK_IN: `Check-in`,
  SIGHTSEEING: `Sightseeing`,
  RESTAURANT: `Restaurant`
};

const EVENT_TYPES = Object.values(EventType);

const EventSuffix = {
  TAXI: `to `,
  BUS: `to `,
  TRAIN: `to `,
  SHIP: `to `,
  TRANSPORT: `to `,
  DRIVE: `to `,
  FLIGHT: `to `,
  CHECK_IN: `in `,
  SIGHTSEEING: `in `,
  RESTAURANT: `in `
};

const iconMap = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈`,
  'check-in': `🏨`,
  'sightseeing': `🏛️`,
  'restaurant': `🍴`
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const DefaultData = {
  DELETE_BTN_TEXT: `Delete`,
  SAVE_BTN_TEXT: `Save`
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const MenuItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`
};

const SortType = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`
};

const RenderPosition = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export {HIDDEN_CLASS, FILTER_ID_PREFIX, monthMap, EVENT_TYPES, EventSuffix, TRANSFER_EVENTS, ACTIVITY_EVENTS, MAX_ISO_STRING_LENGTH, MAX_SHOWING_OFFERS, FIRST_DAY_COUNTER, FilterType, iconMap, SHAKE_ANIMATION_TIMEOUT, DefaultData, Method, MenuItem, SortType, BAR_HEIGHT, Mode, RenderPosition, AUTHORIZATION, END_POINT, STORE_NAME, MIN_BAR_LENGTH, BAR_THICKNESS, DATALABELS_SIZE, TITLE_FONT_SIZE, TICKS_PADDING, TICKS_FONT_SIZE, MONEY_TIME_SPENT_CHART_FACTOR, TRANSPORT_CHART_FACTOR, DEFAULT_RADIX};
