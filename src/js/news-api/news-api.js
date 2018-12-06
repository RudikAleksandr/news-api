
export default class NewsApi {
  static get API_KEY() {
    return '7e92c05c99e645baacb7560198807645A';
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
      mode: 'cors',
      headers: {
        'X-Api-Key': this.API_KEY,
      },
    };
  }

  static async httpGetAllSources() {
    const responce = await fetch(this.URL_ALL_SOURCES);

    if (responce.status !== 200) {
      return Promise.reject(responce);
    }

    return responce.json();
  }

  static async httpGetArticlesSource(idSource, numberArticles) {
    const queryURL = `${this.URL_SOURCE}/?sources=${idSource}&pageSize=${numberArticles}`;
    const responce = await fetch(queryURL, this.requestOptions);

    if (responce.status !== 200) {
      return Promise.reject(responce);
    }

    return responce.json();
  }
}
