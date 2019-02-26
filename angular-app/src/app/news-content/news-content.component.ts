import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import config from '../../config';
import { NewsService } from '../services/news/news.service';
import { IArticle } from '../../interfaces';
import { NewsUserService } from '../services/news-user/news-user.service';
@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent implements OnInit {
  public news: IArticle = {
    author: '',
    content: '',
    description: '',
    publishedAt: '',
    title: '',
    url: '',
    urlToImage: '',
  };
  public title: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public newsService: NewsService,
    public newsUserService: NewsUserService,
  ) {
    this.route.params.subscribe(this.handlerRouteParams.bind(this));
  }

  ngOnInit() { }

  handlerRouteParams(params: object) {
    const idNews = params['id'];
    const idSource = params['source'];

    if (idSource === config.ID_USER_SOURCE) {
      this.newsUserService.getUserNewsById(idNews).subscribe((news: IArticle) => {
        this.news = news;
      });
    } else {
      this.news = this.newsService.getFromCacheById(idSource, idNews);
    }

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
    this.newsUserService.removeUserNewsById(id).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
