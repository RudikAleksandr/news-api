import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  @Input() newsList: Array<Object> = [];
  @Output() clickLoadButton: EventEmitter<number> = new EventEmitter();
  @Output() deleteNews: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  handlerClickLoadButton() {
    this.clickLoadButton.emit(this.newsList.length);
  }

  handleDeleteNews(id: string) {
    this.deleteNews.emit(id);
  }

}
