import UserModel from './user-model';

function createUser(userData, callback) {
  UserModel.create(userData, callback);
}

function findUser(userData, callback) {
  UserModel.findOne(userData, callback);
}

function findUserById(id, callback) {
  UserModel.findById(id, callback);
}

export {
  createUser,
  findUser,
  findUserById,
}