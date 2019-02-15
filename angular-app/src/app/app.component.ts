import { Component } from '@angular/core';
import NewsAPIUtil from '../utils/news-api-utils';
import userNews from '../db/user-news';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sourcesNews: Array<Object>;
  public viewNews: Array<Object> =  [];
  private allNews: Array<Object> =  [];
  private idSelectedSource: string;
  private cacheLoadedNews: Object = {};
  private COUNT_ADD_VIEW_NEWS: number = 5;
  private isUserNews: boolean = false;

  ngOnInit() {
    this.initSourcesNews();
  }

  initSourcesNews() {
     NewsAPIUtil.httpGetAllSources().then((data) => {
       this.sourcesNews = data.sources;
     });
  }

  httpGetArticlesSource(idSelectedSource: string, countNews: number = 5) {
    NewsAPIUtil.httpGetArticlesSource(idSelectedSource, countNews).then(({articles}) => {
      this.cacheLoadedNews[idSelectedSource] = articles;
      this.setNews(articles, countNews);
    });
  }

  setNews(news:  Array<Object>, countViewNews: number = 0) {
    this.allNews = news;
    this.viewNews = news.slice(0, countViewNews || this.COUNT_ADD_VIEW_NEWS);
  }

  setNewsBySourceId(idSelectedSource: string) {
    const cachedNews = this.cacheLoadedNews[idSelectedSource];

    if (cachedNews) {
      this.setNews(cachedNews);
    } else {
      this.httpGetArticlesSource(idSelectedSource);
    }
  }

  handlerSelectedSource(idSelectedSource: string) {
    if (idSelectedSource) {
      this.idSelectedSource = idSelectedSource;
      this.setNewsBySourceId(idSelectedSource);
    } else {
      this.idSelectedSource = '';
      this.setNews([]);
    }
  }

  handlerCreatedUserNews(isCreatedUserNews: boolean) {
    this.isUserNews = isCreatedUserNews;

    if (isCreatedUserNews) {
      this.setNews(userNews);
    } else if (this.idSelectedSource) {
      this.setNewsBySourceId(this.idSelectedSource);
    } else {
      this.setNews([]);
    }
  }

  handlerClickLoad(countViewNews: number) {
    const newCountVewsNews = countViewNews + this.COUNT_ADD_VIEW_NEWS;

    if (this.isUserNews) {
      if (countViewNews < this.allNews.length) {
        this.viewNews = this.allNews.slice(0, newCountVewsNews);
      } else  {
        alert('Load all news');
      }
    } else if (this.cacheLoadedNews[this.idSelectedSource].length >= newCountVewsNews) {
      this.viewNews = this.cacheLoadedNews[this.idSelectedSource].slice(0, newCountVewsNews);
    } else {
      this.httpGetArticlesSource(this.idSelectedSource, newCountVewsNews);
    }
  }
}



