import * as EventHandlers from './event-filter-sources';

export default class FilterSources {
  constructor(nodeSelector) {
    this.nodeFilterSources = document.querySelector(nodeSelector);
    this.countNews = this.countNews;

    this.nodeFilterSources.querySelector('.filter-sources__range')
      .onchange = EventHandlers.handlerChangeRange.bind(this);
  }

  set countNews(countNews) {
    const nodeFilterSourcesValue = this.nodeFilterSources
      .querySelector('.filter-sources__value');

    nodeFilterSourcesValue.innerText = countNews;
  }

  get countNews() {
    const count = this.nodeFilterSources
      .querySelector('.filter-sources__range').value;
    return Number(count);
  }
}
