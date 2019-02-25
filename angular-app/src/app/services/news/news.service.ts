import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public showNewsEvent: EventEmitter<string> = new EventEmitter();
  public editNewsEvent: EventEmitter<string> = new EventEmitter();
  public deleteNewsEvent: EventEmitter<string> = new EventEmitter();
  public wordsFilterEvent: EventEmitter<string> = new EventEmitter();
  private cache: Object = {};

  constructor() { }

  showNews(id: string) {
    this.showNewsEvent.emit(id);
  }

  editNews(id: string) {
    this.editNewsEvent.emit(id);
  }

  deleteNews(id: string) {
    this.deleteNewsEvent.emit(id);
  }

  wordsFilter(words: string) {
    this.wordsFilterEvent.emit(words);
  }

  setToCache(key: string, data: Array<any>): void {
    this.cache[key] = [...data];
  }

  getFromCache(key: string): Array<Object> {
    return this.cache[key];
  }

  getFromCacheById(key: string, id: string): Object {
    const data = this.cache[key];
    const length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i].id === id) {
        return data[i];
      }
    }
  }

  editToCacheById(key: string, newsForEdit: Object): void {
    const news = this.cache[key];
    if (news) {
      const id = newsForEdit['id'];
      const length = this.cache[key].length;
      for (let i = 0; i < length; i++) {
        if (news[i].id === id) {
          news[i] = {...newsForEdit};
          break;
        }
      }
    }
  }

  removeFromCacheById(key: string, id: string): void {
    const data = this.cache[key];
    if (data) {
      const length = data.length;
      for (let i = 0; i < length; i++) {
        if (data[i].id === id) {
          data.splice(i, 1);
          break;
        }
      }
    }
  }

}
