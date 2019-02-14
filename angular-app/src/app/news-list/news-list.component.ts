import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  @Input() newsList: Array<Object> = [];

  constructor() { }

  ngOnInit() {
  }

}
