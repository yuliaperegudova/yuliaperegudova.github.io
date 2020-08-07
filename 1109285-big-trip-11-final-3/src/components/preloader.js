import AbstractComponent from "./abstract-component";

const createPreloaderTemplate = () => {
  return (
    `<p class="trip-events__msg">Loading...</p>`
  );
};

export default class Preloader extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createPreloaderTemplate();
  }
}
