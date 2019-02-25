import mongoose from 'mongoose';

const NAME_MODEL = 'User';
const userSchema = new mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
});
const UserModel = mongoose.model(NAME_MODEL, userSchema);

export default UserModel;