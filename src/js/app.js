import '../css/style.css';
import '../my.json';
import NewsApi from './news-api/news-api';
import AllSources from './components/all-sources/all-sources';
import SourceContent from './components/source-content/source-content';
import FilterSources from './components/filter-sources/filter-sources';

NewsApi.httpGetAllSources()
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
    alert(`Error. ${errorMessage}`);
  });

document.querySelector('.header-show-news').onclick = function showNews() {
  import('./components/show-news-button/show-news-button').then(module => {
    module.showNews();
  });
};
