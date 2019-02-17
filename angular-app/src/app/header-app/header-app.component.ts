import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { EventEmitter } from '@angular/core';
import config from '../../config';

@Component({
  selector: 'header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.css']
})
export class HeaderAppComponent implements OnInit {
  private isCreatedUserNews: boolean;
  private nameSource: string;
  private title: string;
  private keyWords: string = '';
  private isShowNav: boolean = true;

  @Input() sources: Array<Object>;
  @Output() idSelectedSource: EventEmitter<string> = new EventEmitter();
  @Output() createdUserNews: EventEmitter<boolean> = new EventEmitter();
  @Output() filterByKeyWords: EventEmitter<Array<string>> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(this.handlerRouterEvents.bind(this));
  }

  ngOnInit() {
    console.log(1);
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
      const listKeyWords = this.keyWords.trim().split(/\W+/g);
      this.filterByKeyWords.emit(listKeyWords);
    }

  onchangeKeyWords(event) {
    this.keyWords = event.target.value;
  }

  handlerRouterEvents(val: Object) {
    if (val instanceof NavigationEnd) {
      const url = val.url.split('/')[1];
      console.log(url);
      if (url === config.ROUTE_EDIT) {
        this.title = 'Edit';
        this.isShowNav = false;
      } else if (url === config.ROUTE_CONTENT) {
        this.isShowNav = false;
      } else {
        this.isShowNav = true;
      }
    }
  }
}
