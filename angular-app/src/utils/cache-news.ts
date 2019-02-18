const cache = {};

export default class CacheNews {
  static setToCache(key: string, data: Array<any>): void {
    cache[key] = [...data];
  }

  static getFromCache(key: string): Array<Object> {
    return cache[key];
  }

  static getFromCacheById(key: string, id: string): Object {
    const data = cache[key];
    const length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i].id === id) {
        return data[i];
      }
    }
  }

  static editToCacheById(key: string, newsForEdit: Object): void {
    const news = cache[key];
    if (news) {
      const id = newsForEdit['id'];
      const length = cache[key].length;
      for (let i = 0; i < length; i++) {
        if (news[i].id === id) {
          news[i] = {...newsForEdit};
          break;
        }
      }
    }
  }

  static removeFromCacheById(key: string, id: string): void {
    const data = cache[key];
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