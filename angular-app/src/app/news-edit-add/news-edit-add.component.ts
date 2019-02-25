import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DbNewsUser from '../../utils/db-news-user';
import config from '../../config';
import { NewsService } from '../services/news/news.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit-add.component.html',
  styleUrls: ['./news-edit-add.component.css']
})
export class NewsEditAddComponent implements OnInit {
  private isDisabledSave: boolean = false;
  private isAdd: boolean = false;
  private news: Object = {
    author: '',
    content: '',
    description: '',
    publishedAt: '',
    title: '',
    urlToImage: '',
    url: '',
    isUserNews: true,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
  ) {
    this.route.params.subscribe(this.handlerRouteParams.bind(this));
   }

  ngOnInit() {
  }

  checkSaveDisabled() {
    const check = this.news['title'].trim() && this.news['content'].trim();
    this.isDisabledSave = !!!check;
  }

  onInputTitle(event) {
    this.news['title'] = event.target.value;
    this.checkSaveDisabled();
  }

  onInputDescription(event) {
    this.news['description'] = event.target.value;
  }

  onInputContent(event) {
    this.news['content'] = event.target.value;
    this.checkSaveDisabled();
  }

  onInputUrlToImage(event) {
    this.news['urlToImage'] = event.target.value;
  }

  onInputPublishedAt(event) {
    this.news['publishedAt'] = event.target.value;
  }

  onInputAuthor(event) {
    this.news['author'] = event.target.value;
  }

  onInputUrl(event) {
    this.news['url'] = event.target.value;
  }

  onClickSave() {
    const news = this.news;
    if (!news['publishedAt'].trim()) {
      news['publishedAt'] = new Date().toISOString();
    }

    if (this.isAdd) {
      DbNewsUser.addNews(news);
    } else {
      DbNewsUser.editNews(news);
      this.newsService.editToCacheById(config.ID_USER_SOURCE, news);
    }

    this.router.navigate(['']);
  }

  onClickCancel() {
    this.router.navigate(['']);
  }

  handlerRouteParams(params: Object) {
    const idNews = params['id'];
    if (idNews) {
      const news = DbNewsUser.getUserNewsById(idNews);
      if (news) {
        this.news = news;
      } else {
        alert('Can not find news by id');
        this.router.navigate(['']);
      }
    } else {
      this.isDisabledSave = true;
      this.isAdd = true;
    }
  }
}
