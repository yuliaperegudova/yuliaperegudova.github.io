import AbstractComponent from "./abstract-component";

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setActiveItem(menuItem) {
    const items = this.getElement().querySelectorAll(`.trip-tabs__btn`);

    items.forEach((item) => {
      return item.innerHTML === menuItem ? item.classList.add(`trip-tabs__btn--active`) : item.classList.remove(`trip-tabs__btn--active`);
    });
  }

  setOnTripTabsChange(handler) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        const menuItem = evt.target.innerHTML;
        handler(menuItem);
      });
    });
  }
}
