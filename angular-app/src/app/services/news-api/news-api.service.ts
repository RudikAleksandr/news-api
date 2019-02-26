import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import config from '../../../config';
import {IArticlesSource, IAllSources} from '../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  constructor(
    public http: HttpClient,
  ) { }

  httpGetAllSources() {
    return this.http.get<IAllSources>(config.URL_ALL_SOURCES)
      .pipe(
        map((responce: IAllSources) => {
          return responce.sources;
        })
      );
  }

  httpGetArticlesSource(idSource: string, numberArticles: number = 5) {
    return this.http.get<IArticlesSource>(`${config.URL_SOURCE}/?sources=${idSource}&pageSize=${numberArticles}`, {
      headers: {
        'X-Api-Key': config.API_KEY,
      },
    }).pipe(
        map((responce: IArticlesSource) => {
          return responce.articles;
        })
      );
  }
}
