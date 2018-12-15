const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const saltRounds = 10;

const schemaDefinition = {
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const schemaOptions = {
  timestamps: true,
};

const userSchema = Schema(schemaDefinition, schemaOptions);

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, saltRounds, function(err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;

    return next();
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  const user = this;

  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    return callback(null, isMatch);
  });
};

mongoose.model('User', userSchema);
