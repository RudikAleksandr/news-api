import { Component } from '@angular/core';
import NewsAPIUtil from '../utils/news-api-utils';
import userNews from '../db/user-news';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sourcesNews: Array<Object>;
  public allNews: Array<Object> = userNews || [];

  ngOnInit() {
    this.initSourcesNews();
  }

  initSourcesNews() {
     NewsAPIUtil.httpGetAllSources().then((data) => {
       this.sourcesNews = data.sources;
     });
  }

  handlerSelectedSource(idSelectedSource: String) {
    NewsAPIUtil.httpGetArticlesSource(idSelectedSource).then(({articles}) => {
      this.allNews.push(articles);
    });
  }
}



