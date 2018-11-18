const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const populationSchema = Schema({
  age: Number,
  census: Number,
  region: Schema.Types.ObjectId,
});

mongoose.model('Population', populationSchema);
