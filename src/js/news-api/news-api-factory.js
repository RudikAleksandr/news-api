
import GetNewsApi from './get-news-api';

const elementsApi = {
  GET: GetNewsApi,
};

export default function NewsApiFactory(type) {
  return elementsApi[type];
}
