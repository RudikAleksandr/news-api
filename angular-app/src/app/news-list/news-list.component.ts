import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NewsService } from '../services/news/news.service';

@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  private wordsFilter = '';
  @Input() newsList: Array<Object> = [];
  @Output() clickLoadButton: EventEmitter<number> = new EventEmitter();

  constructor(
    private newsService: NewsService,
  ) {
    this.newsService.wordsFilterEvent.subscribe(this.handlerFilterNews.bind(this));
  }

  ngOnInit() {

  }

  handlerClickLoadButton() {
    this.clickLoadButton.emit();
  }

  handlerFilterNews(wordsFilter: string) {
    this.wordsFilter = wordsFilter;
  }
}
