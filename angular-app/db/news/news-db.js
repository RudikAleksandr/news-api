import NewsModel from './news-model';

function createNews(newsData, callback) {
  NewsModel.create(newsData, callback);
}

function findAllNews(callback) {
  NewsModel.find({}, callback);
}

function findNewsById(id, callback) {
  NewsModel.findById(id, callback);
}

function updateNewsById(id, dataUpdate,callback) {
  NewsModel.findByIdAndUpdate(id, dataUpdate, callback);
}

function removeNewsById(id, callback) {
  NewsModel.findByIdAndRemove(id, callback);
}

export {
  createNews,
  findAllNews,
  findNewsById,
  updateNewsById,
  removeNewsById,
}