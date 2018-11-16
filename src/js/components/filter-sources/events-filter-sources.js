import SourceContent from '../source-content/source-content';
import AllSources from '../all-sources/all-sources';

function handlerChangeRange(event) {
  this.countNews = event.target.value;

  const sourceContent = new SourceContent('.source-content');
  const { idCurrentSource } = new AllSources('.all-sources');

  sourceContent.redirectArticles(idCurrentSource, this.countNews);
}

export {
  handlerChangeRange,
};
