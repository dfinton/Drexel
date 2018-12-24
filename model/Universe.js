const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaDefinition = {
  login: {
    type: String,
    required: true,
    unique: true,
  },
};

const schemaOptions = {
  timestamps: true,
};

const universeSchema = Schema(schemaDefinition, schemaOptions);

mongoose.model('Universe', universeSchema);
