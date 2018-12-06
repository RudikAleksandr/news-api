import NewsApiFactory from '../../news-api/news-api-factory';
import { createNode } from '../../utils/node-util';
export default class SourceContent {
  constructor(nodeSelector) {
    this.nodeSourceContent = document.querySelector(nodeSelector);
    this.articlesContainer = null;
  }

  set articles(articles) {
    this.articlesContainer = articles;
  }

  createArticles() {
    const fragmentContainerArticles = document.createDocumentFragment();
    const nodeDiv = createNode({
      tagName: 'div',
      className: 'source-content__articles',
    });

    this.articlesContainer.forEach((article) => {
      const date = new Date(article.publishedAt).toLocaleString();
      const innerimg = article.urlToImage
        ? `<img src="${article.urlToImage}" width="180" height="140" alt="Image news" class="source-article__img">`
        : '<div class="source-article__instead-img"></div>';
      const nodeArticle = createNode({
        tagName: 'article',
        className: 'source-article',
        innerHTML: `
          ${innerimg}
          <h3 class="source-article__title">${article.title}</h3>
          <p class="source-article__description">${article.description}</p>
          <span class="source-article__date">${date}</span>
          <a href="${article.url}" target="_blank" class="source-article__link">See more</a>`,
      });

      nodeDiv.appendChild(nodeArticle);
    });

    fragmentContainerArticles.appendChild(nodeDiv);

    return fragmentContainerArticles;
  }

  redirectArticles(idSource, countNews) {
    const nodeArticles = this.nodeSourceContent.querySelector('.source-content__articles');
    const getNewsApi = NewsApiFactory('GET');
    nodeArticles.innerHTML = 'Please wait...';

     
    getNewsApi.httpGetArticlesSource(idSource, countNews)
      .then(({ articles }) => {
        this.articles = articles;
        this.viewNameSourceContent();
        this.viewArticles();
      })
      .catch((errorMessage) => {
        import('../../error-handler/error-handler').then(module => {
          module.default.showErrorMessage();
          nodeArticles.innerHTML = '';
        });
      });
  }

  viewArticles() {
    const nodeArticles = this.nodeSourceContent.querySelector('.source-content__articles');
    const fragmentArticles = this.createArticles();

    nodeArticles.replaceWith(fragmentArticles);
  }

  viewNameSourceContent() {
    const nodeNameSourceContent = this.nodeSourceContent.querySelector('.source-content__author');
    nodeNameSourceContent.innerText = this.articlesContainer[0].source.name;
  }
}
