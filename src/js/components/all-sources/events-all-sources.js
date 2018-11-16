import SourceContent from '../source-content/source-content';
import FilterSources from '../filter-sources/filter-sources';

function handlerClick(event) {
  const clickElem = event.target;

  if (clickElem.tagName === 'LI') {
    const idSource = clickElem.getAttribute('data-id-source');
    const { countNews } = new FilterSources('.filter-sources');
    const sourceContent = new SourceContent('.source-content');

    this.clickCurentNode = clickElem;
    sourceContent.redirectArticles(idSource, countNews);
  }
}

export {
  handlerClick,
};
