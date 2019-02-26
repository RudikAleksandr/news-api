import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NewsService } from '../services/news/news.service';
import { IArticle } from '../../interfaces';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  public wordsFilter = '';
  @Input() newsList: Array<IArticle> = [];
  @Output() clickLoadButton: EventEmitter<number> = new EventEmitter();

  constructor(
    public newsService: NewsService,
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
