import config from '../config';

export default class NewsApi {
  static get requestOptions(): Object {
    return {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-Api-Key': config.API_KEY,
      },
    };
  }

  static async httpGetAllSources() {
    const responce = await fetch(config.URL_ALL_SOURCES);

    if (responce.status !== 200) {
      return Promise.reject(responce);
    }

    return responce.json();
  }

  static async httpGetArticlesSource(idSource: string, numberArticles: number = 5, filter: string = null) {
    const queryURL = `${config.URL_SOURCE}/?sources=${idSource}&pageSize=${numberArticles}${filter ? '&q=' + filter : ''}`;
    const responce = await fetch(queryURL, this.requestOptions);

    if (responce.status !== 200) {
      return Promise.reject(responce);
    }

    return responce.json();
  }
}