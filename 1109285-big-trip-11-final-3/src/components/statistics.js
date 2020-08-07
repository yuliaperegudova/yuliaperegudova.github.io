import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getDurationDate} from "../utils/common";
import {iconMap, BAR_HEIGHT, MIN_BAR_LENGTH, BAR_THICKNESS, DATALABELS_SIZE, TITLE_FONT_SIZE, TICKS_PADDING, TICKS_FONT_SIZE, MONEY_TIME_SPENT_CHART_FACTOR, TRANSPORT_CHART_FACTOR} from "../const";

const getUniqItems = (item, index, arr) => {
  return arr.indexOf(item) === index;
};

const calcUniqItemsCount = (points, type) => {
  return points.filter((point) => point.type.toUpperCase() === type).length;
};

const calcUniqItemsPrice = (points, type) => {
  let priceSum = 0;
  const pointsCosts = points.reduce((acc, point) => {
    if (point.type.toUpperCase() === type) {
      priceSum += parseInt(point.price, 10);
      acc[point.type.toUpperCase()] = priceSum;
    }
    return acc;
  }, {});
  return pointsCosts[type];
};

const calcUniqItemsTimeSpent = (points, type) => {
  let timeSum = 0;
  const pointsTimeSpent = points.reduce((acc, point) => {
    if (point.type.toUpperCase() === type) {
      const durationTime = getDurationDate(point.time.eventStartTime, point.time.eventEndTime);
      timeSum += durationTime.asHours();
      acc[point.type.toUpperCase()] = Math.round(timeSum);
    }
    return acc;
  }, {});
  return pointsTimeSpent[type];
};

const getPointsType = (points) => {
  return points.map((point) => point.type.toUpperCase()).filter(getUniqItems);
};

const renderMoneyChart = (moneyCtx, points) => {
  const pointTypes = getPointsType(points);
  const pointsCosts = pointTypes.map((type) => calcUniqItemsPrice(points, type));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointTypes,
      datasets: [{
        data: pointsCosts,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: MIN_BAR_LENGTH,
        barThickness: BAR_THICKNESS
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: DATALABELS_SIZE
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: TITLE_FONT_SIZE,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: TICKS_PADDING,
            fontSize: TICKS_FONT_SIZE,
            callback: (type) => {
              return `${iconMap[type.toLowerCase()]} ${type.toUpperCase()}`;
            }
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, points) => {
  const pointTypes = getPointsType(points).filter((point) => point !== `RESTAURANT` && point !== `CHECK-IN` && point !== `SIGHTSEEING`);
  const pointTypesCount = pointTypes.map((type) => calcUniqItemsCount(points, type));

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointTypes,
      datasets: [{
        data: pointTypesCount,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: MIN_BAR_LENGTH,
        barThickness: BAR_THICKNESS
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: DATALABELS_SIZE
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: TITLE_FONT_SIZE,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: TICKS_PADDING,
            fontSize: TICKS_FONT_SIZE,
            callback: (type) => {
              return `${iconMap[type.toLowerCase()]} ${type.toUpperCase()}`;
            }
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpentChart = (timeSpentCtx, points) => {
  const pointTypes = getPointsType(points);
  const pointTypesTimeSpent = pointTypes.map((type) => calcUniqItemsTimeSpent(points, type));

  return new Chart(timeSpentCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointTypes,
      datasets: [{
        data: pointTypesTimeSpent,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: MIN_BAR_LENGTH,
        barThickness: BAR_THICKNESS
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: DATALABELS_SIZE
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: TITLE_FONT_SIZE,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: TICKS_PADDING,
            fontSize: TICKS_FONT_SIZE,
            callback: (type) => {
              return `${iconMap[type.toLowerCase()]} ${type.toUpperCase()}`;
            }
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor({points}) {
    super();

    this._points = points;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();

    this.rerender(this._points);
  }

  recoveryListeners() {}

  rerender(points) {
    this._points = points;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpentCtx = element.querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * MONEY_TIME_SPENT_CHART_FACTOR;
    transportCtx.height = BAR_HEIGHT * TRANSPORT_CHART_FACTOR;
    timeSpentCtx.height = BAR_HEIGHT * MONEY_TIME_SPENT_CHART_FACTOR;

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, this._points.getPoints());
    this._transportChart = renderTransportChart(transportCtx, this._points.getPoints());
    this._timeSpentChart = renderTimeSpentChart(timeSpentCtx, this._points.getPoints());
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpentChart) {
      this._timeSpentChart.destroy();
      this._timeSpentChart = null;
    }
  }
}
