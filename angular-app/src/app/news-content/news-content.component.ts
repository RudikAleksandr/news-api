import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DbNewsUser from '../../utils/db-news-user';
import config from '../../config';
import { NewsService } from '../services/news/news.service';

@Component({
  selector: 'news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent implements OnInit {
  public news: Object = {};
  public title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
  ) {
    this.route.params.subscribe(this.handlerRouteParams.bind(this));
  }

  ngOnInit() { }

  handlerRouteParams(params: Object) {
    const idNews = params['id'];
    const idSource = params['source'];
    let news: Object;

    if (idSource === config.ID_USER_SOURCE) {
      news = DbNewsUser.getUserNewsById(idNews);
    } else {
      news = this.newsService.getFromCacheById(idSource, idNews);
    }

    this.news = news;
  }

  onClickBack() {
    this.router.navigate(['']);
  }

  onClickEdit() {
    this.router.navigate([`/${config.ROUTE_EDIT}`, this.news['id']]);
  }

  onClickDelete() {
    const id = this.news['id'];
    this.newsService.removeFromCacheById(config.ID_USER_SOURCE, id);
    DbNewsUser.removeUserNewsById(id);
    this.router.navigate(['']);
  }

}
