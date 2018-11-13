import NewsApi from './news-api';
import AllSources from './components/all-sources';
import SourceContent from './components/source-content';
import FilterSources from './components/filter-sources';

NewsApi.httpGetAllSources().then(({ sources }) => {
  const allSources = new AllSources('.all-sources__list');
  const sourceContent = new SourceContent('.source-content');
  const { countNews } = new FilterSources('.filter-sources');

  allSources.sources = sources;
  allSources.viewSources();
  allSources.clickCurentNode = allSources.nodeSources.firstElementChild;
  sourceContent.redirectArticles(sources[0].id, countNews);
});
