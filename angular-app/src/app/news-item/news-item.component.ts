import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
  @Input() news: Object;

  constructor() {
    // this.news.publishedAt = new Date(this.news.publishedAt).toString();
   }

  ngOnInit() {
  }

}

interface IArticle {

}
