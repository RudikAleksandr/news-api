import { Component } from '@angular/core';
import NewsAPIUtil from '../utils/news-api';
import DbNewsUser from '../utils/db-news-user';
import CacheNews from '../utils/cache-news';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sourcesNews: Array<Object>;
  public viewNews: Array<Object> =  [];
  private idSelectedSource: string;
  private isUserNews: boolean = false;
  private wordsForFilter: Array<string> = null;
  private COUNT_ADD_VIEW_NEWS: number = 5;
  private ID_USER_SOURCE: string = 'userSource';
  private FIELDS_FILTER = ['author', 'description', 'title'];

  ngOnInit() {
    this.initSourcesNews();
  }

  initSourcesNews() {
     NewsAPIUtil.httpGetAllSources().then((data) => {
       this.sourcesNews = data.sources;
     });
  }

  httpGetArticlesSource(idSelectedSource: string, countNews: number = this.COUNT_ADD_VIEW_NEWS) {
    NewsAPIUtil.httpGetArticlesSource(idSelectedSource, countNews).then(({articles}) => {
      CacheNews.setToCache(idSelectedSource, articles);
      this.viewNews = articles;
    });
  }

  httpGetFilterArticlesSource(idSelectedSource: string, countNews: number = this.COUNT_ADD_VIEW_NEWS, wordsForFilter: Array<Object>) {
    const filter = wordsForFilter.join(' ');
    NewsAPIUtil.httpGetArticlesSource(idSelectedSource, countNews, filter).then(({articles}) => {
      this.viewNews = articles;
    });
  }


  setNewsBySourceId(idSelectedSource: string) {
    const cacheNews = CacheNews.getFromCache(idSelectedSource);

    if (cacheNews && cacheNews.length >= this.COUNT_ADD_VIEW_NEWS) {
      this.viewNews = [...cacheNews.slice(0, this.COUNT_ADD_VIEW_NEWS)];
    } else if (idSelectedSource === this.ID_USER_SOURCE) {
      const userNews = DbNewsUser.getUserNews(0, this.COUNT_ADD_VIEW_NEWS);
      CacheNews.setToCache(this.ID_USER_SOURCE, userNews);
      this.viewNews = [...userNews];
    } else {
      this.httpGetArticlesSource(idSelectedSource);
    }
  }

  handlerSelectedSource(idSelectedSource: string) {
    if (idSelectedSource) {
      this.idSelectedSource = idSelectedSource;
      this.setNewsBySourceId(idSelectedSource);
    } else {
      this.idSelectedSource = null;
      this.viewNews = [];
    }
  }

  handlerCreatedUserNews(isCreatedUserNews: boolean) {
    this.isUserNews = isCreatedUserNews;
    const idSelectedSource = isCreatedUserNews ? this.ID_USER_SOURCE : this.idSelectedSource;

    if (idSelectedSource) {
      this.setNewsBySourceId(idSelectedSource);
    } else {
      this.viewNews = [];
    }
  }

  loadNews() {
    const countViewNews = this.viewNews.length;
    const newCountViewNews = countViewNews + this.COUNT_ADD_VIEW_NEWS;
    const idSelectedSource = this.isUserNews ? this.ID_USER_SOURCE : this.idSelectedSource;
    const cacheNews = CacheNews.getFromCache(idSelectedSource);

    if (cacheNews.length >= newCountViewNews) {
      this.viewNews.push(...cacheNews.slice(countViewNews, newCountViewNews));
    } else if (this.isUserNews) {
      const userNews = DbNewsUser.getUserNews(countViewNews, this.COUNT_ADD_VIEW_NEWS);
      if (userNews.length) {
        this.viewNews.push(...userNews);
      } else {
        alert('Load all news');
      }
    } else {
      this.httpGetArticlesSource(idSelectedSource, newCountViewNews);
    }
  }

  loadFilterNews(from: number) {
    if (this.isUserNews) {
      const filterNews = DbNewsUser.getUserNews(from, this.COUNT_ADD_VIEW_NEWS, this.wordsForFilter, this.FIELDS_FILTER);
      if (filterNews.length && from) {
        this.viewNews.push(...filterNews);
      } else if (!from) {
        this.viewNews = [...filterNews]
      } else {
        alert('Load all filter news by key words');
      }
    } else {
      this.httpGetFilterArticlesSource(this.idSelectedSource, from + this.COUNT_ADD_VIEW_NEWS, this.wordsForFilter);
    }
  }

  handlerClickLoad() {
    this.wordsForFilter ? this.loadFilterNews(this.viewNews.length) : this.loadNews();
  }

  handlerDeleteNews(id: string) {
    DbNewsUser.removeUserNewsById(id);

    const newCountViewNews = this.viewNews.length - 1 ? this.viewNews.length - 1 : this.COUNT_ADD_VIEW_NEWS;
    const userNews = DbNewsUser.getUserNews(0, newCountViewNews);

    CacheNews.setToCache(this.ID_USER_SOURCE, userNews);
    this.viewNews = userNews;
  }

  handlerFilterByKeyWords(listKeyWords: Array<string>) {
    const idSelectedSource = this.isUserNews ? this.ID_USER_SOURCE : this.idSelectedSource;

    if (listKeyWords[0] && idSelectedSource) {
      this.wordsForFilter = listKeyWords;
      this.loadFilterNews(0);
    } else if (idSelectedSource){
      this.wordsForFilter = null;
      this.setNewsBySourceId(idSelectedSource);
    }
  }

}


