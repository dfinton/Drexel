const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaDefinition = {
  token: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
};

const schemaOptions = {
  timestamps: true,
};

const sessionSchema = Schema(schemaDefinition, schemaOptions);

mongoose.model('Session', sessionSchema);
