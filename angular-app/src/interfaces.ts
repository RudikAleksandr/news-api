
interface IArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
  id?: string;
  isUserNews?: boolean;
  source?: object;
}

interface IAllSources {
  sources: Array<object>;
  status: string;
}

interface IArticlesSource {
  articles: Array<IArticle>;
  status: string;
  totalResults: number;
}

export {
  IArticle,
  IAllSources,
  IArticlesSource,
};
