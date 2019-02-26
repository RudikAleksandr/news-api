import mongoose from 'mongoose';

const NAME_MODEL = 'News';
const newsSchema = new mongoose.Schema({
  author: String,
  content: String,
  description: String,
  publishedAt: String,
  title: String,
  url: String,
  urlToImage: String,
  isUserNews: Boolean,
});
const NewsModel = mongoose.model(NAME_MODEL, newsSchema);

export default NewsModel;
