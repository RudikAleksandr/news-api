import NewsApiFactory from './news-api-factory';

const proxyNewsApiFactory = new Proxy(NewsApiFactory, {
  apply(target, thisArg, argumentsList) {
    console.log(`Type request: ${argumentsList[0]}`);

    return target.apply(thisArg, argumentsList);
  },
});

export default proxyNewsApiFactory;
