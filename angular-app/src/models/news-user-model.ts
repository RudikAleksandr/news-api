import userNews from '../db/user-news';

export default class UserNewsModel {
  static getUserNews(): Array<Object> {
    return userNews;
  }

  static removeUserNewsById(id: string): void {
    for (let i = 0; i < userNews.length; i++) {
      if (userNews[i].publishedAt === id) {
        userNews.splice(i, 1);
        break;
      }
    }
  }
}