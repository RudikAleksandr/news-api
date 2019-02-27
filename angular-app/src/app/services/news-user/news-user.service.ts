import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IArticle } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsUserService {
  constructor(
    public http: HttpClient,
  ) { }

  getUserNews(from: number = 0, count: number = null) {
    return this.http.get<Array<IArticle>>(`/news`)
      .pipe(
        map((responce: Array<IArticle>) => {
          return responce.slice(from, from + count || responce.length);
        })
      );
  }

  getUserNewsById(id: string) {
    return this.http.get(`/news/${id}`);
  }

  editNews(news: IArticle) {
    return this.http.put(`/news/${news.id}`, news);
  }

  removeUserNewsById(id: string) {
    return this.http.delete(`/news/${id}`);
  }

  addNews(news: IArticle) {
    news.isUserNews = true;
    return this.http.post(`/news`, news);
  }

  setIdForNewsAPI(news: Array<IArticle>): Array<IArticle> {
    return news.map((item) => {
      const id = item.publishedAt.replace(/-|:/g, '');
      return {...item, id};
    });
  }
}
