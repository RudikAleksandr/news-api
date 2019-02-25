import mongoose from 'mongoose';

const NAME_MODEL = 'News';
const newsSchema = new mongoose.Schema({
  _id: Number,
  category: String,
  country: String,
  description: String,
  language: String,
  name: String,
});
const NewsModel = mongoose.model(NAME_MODEL, newsSchema);

export default NewsModel;
