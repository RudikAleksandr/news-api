import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.css']
})
export class HeaderAppComponent implements OnInit {
  public isCreatedMe: Boolean;
  private sourceName: String;

  @Input() sources: Array<Object>;
  @Output() idSelectedSource: EventEmitter<string> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {

  }

  onChangeCreatedMe() {
    this.isCreatedMe = !this.isCreatedMe;
  }
  onChangeSource(event) {
    const source: any = this.sources[event.target.value];
    this.sourceName = source.name;
    this.idSelectedSource.emit(source.id);
  }

}
