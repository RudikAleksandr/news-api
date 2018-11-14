
export default class NewsApi {
  static get API_KEY() {
    return '20d9dd9a93ad4f9893a31bb7e6fbd9f4';
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
    try {
      const responce = await fetch(this.URL_ALL_SOURCES);

      if (responce.status !== 200) {
        throw responce;
      }

      return responce.json();
    } catch (error) {
      throw error;
    }
  }

  static async httpGetArticlesSource(idSource, numberArticles) {
    try {
      const queryURL = `${this.URL_SOURCE}/?sources=${idSource}&pageSize=${numberArticles}`;
      const responce = await fetch(queryURL, this.requestOptions);

      if (responce.status !== 200) {
        throw responce;
      }

      return responce.json();
    } catch (error) {
      throw error;
    }
  }
}
