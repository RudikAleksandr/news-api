import './show-news-button.css';
import SourceContent from '../source-content/source-content';
import FilterSources from '../filter-sources/filter-sources';


function showNews() {
  const sourceContent = new SourceContent('.source-content');
  const { countNews } = new FilterSources('.filter-sources');

  sourceContent.redirectArticles('abc-news-au', countNews);
}

export {
  showNews,
};
