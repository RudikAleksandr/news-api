import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import config from '../../config';
import { NewsService } from '../services/news/news.service';
import { IArticle } from '../../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsUserService } from '../services/news-user/news-user.service';
@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit-add.component.html',
  styleUrls: ['./news-edit-add.component.css']
})
export class NewsEditAddComponent implements OnInit {
  public isAdd: boolean = false;
  public id: string;
  public titleControl: FormControl = new FormControl('', [Validators.required]);
  public descriptionControl: FormControl = new FormControl('');
  public contentControl: FormControl = new FormControl('', [Validators.required]);
  public urlToImageControl: FormControl = new FormControl('');
  public publishedAtControl: FormControl = new FormControl('');
  public authorControl: FormControl = new FormControl('');
  public urlControl: FormControl = new FormControl('');
  public isUserNewsControl: FormControl = new FormControl(true);
  public newsFormGroup: FormGroup = new FormGroup({
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
    public route: ActivatedRoute,
    public router: Router,
    public newsService: NewsService,
    public newsUserService: NewsUserService,
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
      this.newsUserService.addNews(news).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      this.newsUserService.editNews(news).subscribe(() => {
        this.newsService.editToCacheById(config.ID_USER_SOURCE, news);
        this.router.navigate(['']);
      });
    }
  }

  onClickCancel() {
    this.router.navigate(['']);
  }

  handlerRouteParams(params: object) {
    this.id = params['id'];
    if (this.id) {
      this.newsUserService.getUserNewsById(this.id).subscribe((news: IArticle) => {
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
      });
    } else {
      this.isAdd = true;
    }
  }
}
