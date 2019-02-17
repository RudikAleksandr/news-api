const cache = {};

export default class CacheNews {
  static setToCache(key: string, data: Array<Object>): void {
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

  static removeFromCacheById(key: string, id: string) {
    const data = cache[key];
    const length = data.length;
    if (data) {
      for (let i = 0; i < length; i++) {
        if (data[i].id === id) {
          data.splice(i, 1);
          break;
        }
      }
    }
  }

}