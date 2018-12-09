const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
  name: String,
  password: String,
});

mongoose.model('User', userSchema);
