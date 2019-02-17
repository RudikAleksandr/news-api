import userNews from '../db/user-news';

export default class DbNewsUser {
  static getUserNews(from: number = 0, count: number = null, wordsFilter: Array<string> = null, fieldsFilter: Array<string> = null): Array<Object> {
    let newsList = userNews;

    if (wordsFilter) {
      newsList = this.filterUserNews(newsList, wordsFilter, fieldsFilter);
    }

    return newsList.slice(from, from + count || newsList.length);
  }

  static removeUserNewsById(id: string): void {
    for (let i = 0; i < userNews.length; i++) {
      if (userNews[i].publishedAt === id) {
        userNews.splice(i, 1);
        break;
      }
    }
  }

  static filterUserNews(newsList: Array<any>, filterWords: Array<string>, fieldsFilter: Array<string>): Array<any> {
    const filterWordsLowerCase = [];

    filterWords.forEach((word) => {
      filterWordsLowerCase.push(word.toLocaleLowerCase());
    })

    return newsList.filter((news) => {
      return fieldsFilter.some((field) => {
        if (news[field]) {
          const wordsField = news[field].trim().split(/\W+/g);
          return wordsField.some((keyWord) => {
            return filterWordsLowerCase.includes(keyWord.toLocaleLowerCase());
          })
        }
      });
    });
  }
}