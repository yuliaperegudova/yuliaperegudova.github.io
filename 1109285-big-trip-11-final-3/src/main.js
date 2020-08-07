import Api from "./api/api";
import Provider from "./api/provider";
import Store from "./api/store.js";
import FilterController from "./controllers/filter-controller";
import Preloader from "./components/preloader";
import Menu from "./components/menu";
import Points from "./models/points";
import Statistics from "./components/statistics";
import TripController from "./controllers/trip-controller";
import TripInfo from "./components/trip-info";
import {render, RenderPosition} from "./utils/render";
import {removeComponent} from "./utils/common";
import {FilterType as filters, MenuItem, AUTHORIZATION, END_POINT, STORE_NAME} from "./const";
import {getPointsByFilter} from "./utils/filter";

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const pointsModel = new Points();
const loadingComponent = new Preloader();

const tripMain = document.querySelector(`.trip-main`);
const pageMain = document.querySelector(`.page-main`);
const tripContriols = tripMain.querySelector(`.trip-controls`);
const tripContriolsHeader = tripContriols.querySelector(`h2`);
const siteTripEvents = pageMain.querySelector(`.trip-events`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
const siteMenu = new Menu();
const tripInfo = new TripInfo(pointsModel);

render(tripMain, tripInfo, RenderPosition.AFTERBEGIN);
render(tripContriolsHeader, siteMenu, RenderPosition.AFTEREND);
render(siteTripEvents, loadingComponent);

const filterController = new FilterController(tripContriols, pointsModel);

const tripController = new TripController(siteTripEvents, filterController, pointsModel, apiWithProvider);
apiWithProvider.getData()
  .then((points) => {
    pointsModel.setPoints(points.events);
    pointsModel.setOffersByType(points.offers);
    pointsModel.setDestinations(points.destinations);
    removeComponent(loadingComponent);
    Object.values(filters).map((filter) => {
      const filteredPoints = getPointsByFilter(pointsModel.getPointsAll(), filter.toLowerCase());
      if (filteredPoints.length === 0) {
        return filterController.disableEmptyFilter(filter.toLowerCase());
      }
      return filterController.render();
    });
    tripController.renderTripList();
  });

pointsModel.setDataChangeHandler(() => {
  removeComponent(tripInfo);
  render(tripMain, tripInfo, RenderPosition.AFTERBEGIN);
});

newEventButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  filterController.setDefaultView(true);
  tripController.createPoint(newEventButton);
});

const statisticsComponent = new Statistics({points: pointsModel});
render(siteTripEvents, statisticsComponent, RenderPosition.AFTEREND);
statisticsComponent.hide();

siteMenu.setOnTripTabsChange((menuItem) => {
  const setCurrentView = (menu, oldElement, newElement) => {
    siteMenu.setActiveItem(menu);
    filterController.setDefaultView(menu);
    oldElement.hide();
    newElement.show();
  };

  switch (menuItem) {
    case MenuItem.TABLE:
      setCurrentView(MenuItem.TABLE, statisticsComponent, tripController);
      newEventButton.removeAttribute(`disabled`);
      break;
    case MenuItem.STATISTICS:
      setCurrentView(MenuItem.STATISTICS, tripController, statisticsComponent);
      filterController.removeChecked();
      newEventButton.setAttribute(`disabled`, `disabled`);
      break;
  }
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`)
    .then(() => {})
    .catch(() => {});
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

