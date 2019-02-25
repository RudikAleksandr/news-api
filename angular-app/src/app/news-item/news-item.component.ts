import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NewsService } from '../services/news/news.service';

@Component({
  selector: 'news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
  @Input() news: Object;

  constructor(private newsService: NewsService) {

  }
  ngOnInit() { }

  handlerShowContent() {
    this.newsService.showNews(this.news['id']);
  }

  handlerDeleteNews() {
    this.newsService.deleteNews(this.news['id']);
  }

  handlerEditNews() {
    this.newsService.editNews(this.news['id']);
  }

}
