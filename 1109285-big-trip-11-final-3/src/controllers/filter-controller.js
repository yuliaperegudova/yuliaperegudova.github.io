import Filter from "../components/filter";
import {FilterType, MenuItem} from "../const";
import {render, replace} from "../utils/render";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new Filter(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent);
    }
  }

  setDefaultView(menuItem = MenuItem.TABLE) {
    this._pointsModel.setFilter(FilterType.EVERYTHING);
    this._activeFilterType = FilterType.EVERYTHING;
    this.render();
    return menuItem === MenuItem.STATISTICS ? this._filterComponent.setDisableInputs() : this._filterComponent.removeDisableInputs();
  }

  removeChecked() {
    this._activeFilterType = null;
    this.render();
  }

  disableEmptyFilter(currentFilter) {
    this._filterComponent.disableEmptyFilter(currentFilter);
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
