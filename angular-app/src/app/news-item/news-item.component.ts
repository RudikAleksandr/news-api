import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from '../services/news/news.service';
import { IArticle } from '../../interfaces';
@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
  @Input() news: IArticle;

  constructor(public newsService: NewsService) {

  }
  ngOnInit() { }

  handlerShowContent() {
    this.newsService.showNews(this.news.id);
  }

  handlerDeleteNews() {
    this.newsService.deleteNews(this.news.id);
  }

  handlerEditNews() {
    this.newsService.editNews(this.news.id);
  }
}
