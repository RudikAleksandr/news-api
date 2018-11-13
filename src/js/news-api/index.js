
export default class NewsApi {
  static get API_KEY() {
    return '44e9b020293440f680fab34b192b8dd0';
  }

  static get URL_ALL_SOURCES() {
    return 'https://newsapi.org/v1/sources';
  }

  static get URL_SOURCE() {
    return 'https://newsapi.org/v2/everything';
  }

  static get requestOptions() {
    return {
      method: 'GET',
      headers: {
        'X-Api-Key': this.API_KEY,
      },
    };
  }

  static httpGetAllSources() {
    return fetch(this.URL_ALL_SOURCES, this.requestOptions)
      .then(responce => responce.json());
  }

  static httpGetArticlesSource(idSource, numberArticles) {
    const queryURL = `${this.URL_SOURCE}/?sources=${idSource}&pageSize=${numberArticles}`;
    return fetch(queryURL, this.requestOptions)
      .then(responce => responce.json());
  }
}
