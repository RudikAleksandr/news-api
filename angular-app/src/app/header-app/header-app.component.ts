import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { EventEmitter } from '@angular/core';
import config from '../../config';
import { NewsService } from '../services/news/news.service';
@Component({
  selector: 'app-header',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.css']
})
export class HeaderAppComponent implements OnInit {
  private isCreatedUserNews: boolean;
  private nameSource: string;
  private title: string;
  private keyWords: string = '';
  private isShowNav: boolean = true;

  @Input() sources: Array<object>;
  @Output() idSelectedSource: EventEmitter<string> = new EventEmitter();
  @Output() createdUserNews: EventEmitter<boolean> = new EventEmitter();
  @Output() addArticle: EventEmitter<Array<string>> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
  ) {
    this.router.events.subscribe(this.handlerRouterEvents.bind(this));
  }

  ngOnInit() {
  }

  onChangeCreatedMe() {
    this.isCreatedUserNews = !this.isCreatedUserNews;
    if (this.isCreatedUserNews) {
      this.title = config.NAME_USER_NEWS;
    } else if (this.nameSource) {
      this.title = this.nameSource;
    } else {
      this.title = '';
    }
    this.createdUserNews.emit(this.isCreatedUserNews);
  }

  onChangeSource(event) {
    const source: any = this.sources[event.target.value];
    if (source) {
      this.title = source.name;
      this.nameSource = source.name;
      this.idSelectedSource.emit(source.id);
    } else {
      this.nameSource = '';
      this.title = this.isCreatedUserNews ? config.NAME_USER_NEWS : '';
      this.idSelectedSource.emit('');
    }
  }

  onClickFilter() {
    this.newsService.wordsFilter(this.keyWords);
  }

  onchangeKeyWords(event) {
    this.keyWords = event.target.value;
  }

  onClickAdd() {
    this.addArticle.emit();
  }

  handlerRouterEvents(val: object) {
    if (val instanceof NavigationEnd) {
      const url = val.url.split('/')[1];
      if (url === config.ROUTE_EDIT) {
        this.title = 'Edit';
        this.isShowNav = false;
      } else if (url === config.ROUTE_CONTENT) {
        if (val.url.includes(`${config.ROUTE_CONTENT}/${config.ID_USER_SOURCE}`)) {
          this.title = 'My news';
        }
        this.isShowNav = false;
      } else if (url === config.ROUTE_ADD) {
        this.title = 'Add';
        this.isShowNav = false;
      } else {
        this.title = this.isCreatedUserNews ? config.NAME_USER_NEWS : '';
        this.isShowNav = true;
      }
    }
  }
}
