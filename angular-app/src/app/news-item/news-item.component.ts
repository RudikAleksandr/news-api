import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
  @Input() news: Object;
  @Output() deleteNews: EventEmitter<any> = new EventEmitter();

  constructor() {

   }

  ngOnInit() {

  }

  handlerDeleteNews() {
    this.deleteNews.emit(this.news['publishedAt']);
  }
}
