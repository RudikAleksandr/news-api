import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import DbNewsUser from '../utils/db-news-user';
import config from '../config';
import { NewsService } from './services/news/news.service';
import { NewsApiService } from './services/news-api/news-api.service';
import { IArticle } from '../interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sourcesNews: Array<object>;
  public viewNews: Array<IArticle> = [];
  private idSelectedSource: string;
  private isUserNews: boolean;
  private COUNT_ADD_VIEW_NEWS = 5;
  private ID_USER_SOURCE: string = config.ID_USER_SOURCE;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private newsApiService: NewsApiService,
  ) {
    this.router.events.subscribe(this.handlerRouterEvents.bind(this));
    this.newsService.editNewsEvent.subscribe(this.handlerEditContent.bind(this));
    this.newsService.showNewsEvent.subscribe(this.handlerShowContent.bind(this));
    this.newsService.deleteNewsEvent.subscribe(this.handlerDeleteNews.bind(this));
  }

  ngOnInit() {
    this.initSourcesNews();
  }

  initSourcesNews() {
    this.newsApiService.httpGetAllSources().subscribe((data: Array<object>) => {
      this.sourcesNews = data;
    })
  }

  httpGetArticlesSource(idSelectedSource: string, countNews: number = this.COUNT_ADD_VIEW_NEWS) {
    this.newsApiService.httpGetArticlesSource(idSelectedSource, countNews).subscribe((articles: Array<IArticle>) => {
      const articlesWithId = DbNewsUser.setIdForNewsAPI(articles);
      this.newsService.setToCache(idSelectedSource, articlesWithId);
      this.viewNews = articlesWithId;
    });
  }

  setNewsBySourceId(idSelectedSource: string) {
    const cacheNews = this.newsService.getFromCache(idSelectedSource);

    if (cacheNews && cacheNews.length >= this.COUNT_ADD_VIEW_NEWS) {
      this.viewNews = [...cacheNews.slice(0, this.COUNT_ADD_VIEW_NEWS)];
    } else if (idSelectedSource === this.ID_USER_SOURCE) {
      const userNews = DbNewsUser.getUserNews(0, this.COUNT_ADD_VIEW_NEWS);
      this.newsService.setToCache(this.ID_USER_SOURCE, userNews);
      this.viewNews = [...userNews];
    } else {
      this.httpGetArticlesSource(idSelectedSource);
    }
  }

  getIdSelectedSource() {
    return this.isUserNews ? this.ID_USER_SOURCE : this.idSelectedSource;
  }

  loadNews() {
    const countViewNews = this.viewNews.length;
    const newCountViewNews = countViewNews + this.COUNT_ADD_VIEW_NEWS;
    const idSelectedSource = this.getIdSelectedSource();
    const cacheNews = this.newsService.getFromCache(idSelectedSource);

    if (cacheNews.length >= newCountViewNews) {
      this.viewNews.push(...cacheNews.slice(countViewNews, newCountViewNews));
    } else if (this.isUserNews) {
      const userNews = DbNewsUser.getUserNews(countViewNews, this.COUNT_ADD_VIEW_NEWS);
      if (userNews.length) {
        this.viewNews = [...this.viewNews, ...userNews];
      } else {
        alert('Load all news');
      }
    } else {
      this.httpGetArticlesSource(idSelectedSource, newCountViewNews);
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
    const idSelectedSource = this.getIdSelectedSource();

    if (idSelectedSource) {
      this.setNewsBySourceId(idSelectedSource);
    } else {
      this.viewNews = [];
    }
  }

  handlerClickLoad() {
    this.loadNews();
  }

  handlerDeleteNews(id: string) {
    DbNewsUser.removeUserNewsById(id);
    this.newsService.removeFromCacheById(this.ID_USER_SOURCE, id);
    this.setNewsBySourceId(this.ID_USER_SOURCE);
  }

  setRouterNavigate(configRouter) {
    this.viewNews = [];
    this.router.navigate(configRouter);
  }

  handlerShowContent(id: string) {
    this.setRouterNavigate([`/${config.ROUTE_CONTENT}`, this.getIdSelectedSource(), id]);
  }

  handlerEditContent(id: string) {
    this.setRouterNavigate([`/${config.ROUTE_EDIT}`, id]);
  }

  handlerAddArticle() {
    this.setRouterNavigate([`/${config.ROUTE_ADD}`]);
  }

  handlerRouterEvents(val: object) {
    const idSelectedSource = this.getIdSelectedSource();
    if (val instanceof NavigationEnd && val.url === '/' && idSelectedSource) {
      this.setNewsBySourceId(idSelectedSource);
    }
  }
}


