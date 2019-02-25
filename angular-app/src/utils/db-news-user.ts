import userNews from '../db/user-news';

let numberId = userNews.length;

export default class DbNewsUser {
  static getUserNews(from: number = 0, count: number = null): Array<Object> {
    let newsList = userNews;
    return newsList.slice(from, from + count || newsList.length);
  }

  static getUserNewsById(id: string): Object {
    const length = userNews.length;
    for (let i = 0; i < length; i++) {
      if (userNews[i].id === id) {
        return {...userNews[i]};
      }
    }
  }

  static setIdForNewsAPI(news: Array<Object> ): Array<Object> {
    return news.map((item) => {
      const id = item['publishedAt'].replace(/-|:/g, '');
      return {...item, id};
    })
  }

  static editNews(news: any): void {
    const length = userNews.length;
    const id = news.id;
    for (let i = 0; i < length; i++) {
      if (userNews[i].id === id) {
        userNews[i] = {...news};
        break;
      }
    }
  }

  static removeUserNewsById(id: string): void {
    const length = userNews.length;
    for (let i = 0; i < length; i++) {
      if (userNews[i].id === id) {
        userNews.splice(i, 1);
        break;
      }
    }
  }

  static addNews(news: any): void {
    news.id = String(++numberId);
    userNews.push(news);
  }
}