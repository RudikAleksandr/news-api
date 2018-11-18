
export default class NewsApi {
  static get API_KEY() {
    return '7e92c05c99e645baacb7560198807645';
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

  static httpGetAllSources() {
    return fetch(this.URL_ALL_SOURCES)
      .then((responce) => {
        console.log('httpGetAllSources 1111111111');
        console.dir(responce);
        if (responce.status !== 200) {
          return Promise.reject(responce);
        }

        responce.prototype = Object.create(Response.prototype);
        return responce.json();
      })
      .catch(error => {
        console.log('httpGetAllSources');
        console.log(error);
        Promise.reject(error.statusText);
      });
  }

  static httpGetArticlesSource(idSource, numberArticles) {
    const queryURL = `${this.URL_SOURCE}/?sources=${idSource}&pageSize=${numberArticles}`;

    return fetch(queryURL, this.requestOptions)
      .then((responce) => {
        if (responce.status !== 200) {
          return Promise.reject(responce);
        }

        responce.prototype = Object.create(Response.prototype);
        return responce.json();
      })
      .catch(({ statusText }) => Promise.reject(statusText));
  }
}
