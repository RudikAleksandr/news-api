import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DbNewsUser from '../../utils/db-news-user';
import config from '../../config';
import { NewsService } from '../services/news/news.service';
import { IArticle } from '../../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit-add.component.html',
  styleUrls: ['./news-edit-add.component.css']
})
export class NewsEditAddComponent implements OnInit {
  private isAdd: boolean = false;
  private id: string;
  private titleControl: FormControl = new FormControl('', [Validators.required]);
  private descriptionControl: FormControl = new FormControl('');
  private contentControl: FormControl = new FormControl('', [Validators.required]);
  private urlToImageControl: FormControl = new FormControl('');
  private publishedAtControl: FormControl = new FormControl('');
  private authorControl: FormControl = new FormControl('');
  private urlControl: FormControl = new FormControl('');
  private isUserNewsControl: FormControl = new FormControl(true);
  private newsFormGroup: FormGroup = new FormGroup({
    title: this.titleControl,
    description: this.descriptionControl,
    content: this.contentControl,
    urlToImage: this.urlToImageControl,
    publishedAt: this.publishedAtControl,
    author: this.authorControl,
    url: this.urlControl,
    isUserNews: this.isUserNewsControl,
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
  ) {
    this.route.params.subscribe(this.handlerRouteParams.bind(this));
   }

  ngOnInit() {
  }

  onClickSave() {
    const news: IArticle = this.newsFormGroup.value;
    news.id = this.id;
    if (!news.publishedAt.trim()) {
      news.publishedAt = new Date().toISOString();
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

  handlerRouteParams(params: object) {
    this.id = params['id'];
    if (this.id) {
      const news = DbNewsUser.getUserNewsById(this.id);
      if (news) {
        this.titleControl.setValue(news.title);
        this.descriptionControl.setValue(news.description);
        this.contentControl.setValue(news.content);
        this.urlToImageControl.setValue(news.urlToImage);
        this.publishedAtControl.setValue(news.publishedAt);
        this.authorControl.setValue(news.author);
        this.urlControl.setValue(news.url);
      } else {
        alert('Can not find news by id');
        this.router.navigate(['']);
      }
    } else {
      this.isAdd = true;
    }
  }
}
