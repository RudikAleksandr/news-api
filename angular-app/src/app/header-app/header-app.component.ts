import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.css']
})
export class HeaderAppComponent implements OnInit {
  public isCreatedUserNews: boolean;
  private sourceName: string;
  private NAME_USER_NEWS: string = 'My news';

  @Input() sources: Array<Object>;
  @Output() idSelectedSource: EventEmitter<string> = new EventEmitter();
  @Output() createdUserNews: EventEmitter<boolean> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {

  }

  onChangeCreatedMe() {
    this.isCreatedUserNews = !this.isCreatedUserNews;
    this.createdUserNews.emit(this.isCreatedUserNews);
  }

  onChangeSource(event) {
    const source: any = this.sources[event.target.value];
    if (source) {
      this.sourceName = source.name;
      this.idSelectedSource.emit(source.id);
    } else {
      this.sourceName = '';
      this.idSelectedSource.emit('');
    }
  }
}
