import '../css/style.css';
import ProxyNewsApiFactory from './news-api/proxy-news-api-factory';
import AllSources from './components/all-sources/all-sources';
import SourceContent from './components/source-content/source-content';
import FilterSources from './components/filter-sources/filter-sources';

const getNewsApi = ProxyNewsApiFactory('GET');

getNewsApi.httpGetAllSources()
  .then(({ sources }) => {
    if (!sources) {
      Promise.reject(sources);
    }
    const allSources = new AllSources('.all-sources__list');
    const sourceContent = new SourceContent('.source-content');
    const { countNews } = new FilterSources('.filter-sources');

    allSources.sources = sources;
    allSources.viewSources();
    allSources.clickCurentNode = allSources.nodeSources.firstElementChild;
    sourceContent.redirectArticles(sources[0].id, countNews);
  })
  .catch((errorMessage) => {
    import('./error-handler/error-handler').then(module => {
      module.default.showErrorMessage();
    });
  });

document.querySelector('.header-show-news').onclick = function showNews() {
  import('./components/show-news-button/show-news-button').then(module => {
    module.showNews();
  });
};
