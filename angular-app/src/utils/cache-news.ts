const cache = {};

export default class CacheNews {
  static setToCache(key: string, data: Array<Object>): void {
    cache[key] = [...data];
  }

  static getFromCache(key: string): Array<Object> {
    return cache[key];
  }

  static removeFromCache(key: string) {

  }
}