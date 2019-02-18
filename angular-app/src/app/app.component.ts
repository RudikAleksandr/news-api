import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import NewsAPIUtil from '../utils/news-api';
import DbNewsUser from '../utils/db-news-user';
import CacheNews from '../utils/cache-news';
import config from '../config';

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
  private ID_USER_SOURCE: string = config.ID_USER_SOURCE;
  private FIELDS_FILTER = ['author', 'description', 'title'];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(this.handlerRouterEvents.bind(this));
  }

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
      const articlesWithId = DbNewsUser.setIdForNewsAPI(articles);
      CacheNews.setToCache(idSelectedSource, articlesWithId);
      this.viewNews = articlesWithId;
    });
  }

  httpGetFilterArticlesSource(idSelectedSource: string, countNews: number = this.COUNT_ADD_VIEW_NEWS, wordsForFilter: Array<Object>) {
    const filter = wordsForFilter.join(' ');
    NewsAPIUtil.httpGetArticlesSource(idSelectedSource, countNews, filter).then(({articles}) => {
      this.viewNews = DbNewsUser.setIdForNewsAPI(articles);
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

  getIdSelectedSource() {
    return this.isUserNews ? this.ID_USER_SOURCE : this.idSelectedSource;
  }

  loadNews() {
    const countViewNews = this.viewNews.length;
    const newCountViewNews = countViewNews + this.COUNT_ADD_VIEW_NEWS;
    const idSelectedSource = this.getIdSelectedSource();
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
    this.wordsForFilter ? this.loadFilterNews(this.viewNews.length) : this.loadNews();
  }

  handlerDeleteNews(id: string) {
    DbNewsUser.removeUserNewsById(id);
    CacheNews.removeFromCacheById(this.ID_USER_SOURCE, id);
    this.setNewsBySourceId(this.ID_USER_SOURCE);
  }

  handlerFilterByKeyWords(listKeyWords: Array<string>) {
    const idSelectedSource = this.getIdSelectedSource();

    if (listKeyWords[0] && idSelectedSource) {
      this.wordsForFilter = listKeyWords;
      this.loadFilterNews(0);
    } else if (idSelectedSource){
      this.wordsForFilter = null;
      this.setNewsBySourceId(idSelectedSource);
    }
  }

  setRouterNavigate(configRouter) {
    this.viewNews = [];
    this.router.navigate(configRouter);
  }

  handlerShowContent(id: string) {
    this.setRouterNavigate([`/${config.ROUTE_CONTENT}`, this.getIdSelectedSource(), id]);
  }

  handlerEditContent(id: String) {
    this.setRouterNavigate([`/${config.ROUTE_EDIT}`, id]);
  }

  handlerAddArticle() {
    this.setRouterNavigate([`/${config.ROUTE_ADD}`]);
  }

  handlerRouterEvents(val: Object) {
    const idSelectedSource = this.getIdSelectedSource();
    if (val instanceof NavigationEnd && val.url === '/' && idSelectedSource) {
      if (this.wordsForFilter) {
        this.loadFilterNews(0);
      } else {
        this.setNewsBySourceId(idSelectedSource);
      }
    }
  }

}


