const fs = require('fs');
const inquirer = require('inquirer');
const mongoose = require('mongoose');
const mustache = require('mustache');
const path = require('path');

require('../model/User');
const userModel = mongoose.model('User');

const rootDir = path.join(__dirname, '..');
const dotenvPath = path.join(rootDir, '.env');
const dotenvTemplatePath = path.join(rootDir, '.env-template');

const validatePassword = function(input) {
  const done = this.async();

  if (input.length < 8) {
    return done('Password needs to be a minimum of 8 characters');
  }

  return done(null, true);
};

const validateLoginName = function(input) {
  const done = this.async();

  if (input.length === 0) {
    return done('The login name needs to be at least 1 character long');
  }

  return done(null, true);
}

const validateEmptyUserCollection = (mongoUri, done) => {
  return (err, count) => {
    if (err) {
      return done(`Count not get a count of the User collection located at "${mongoUri}"`);
    }

    if (count > 0) {
      return done('This appears to be an already existing and initialized database. To clear, exit this script and run "npm run reset"');
    }

    return done(null, true);
  };
};

const validateMongoUri = function(input) {
  const done = this.async();

  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  mongoose.connect(input, options, (err) => {
    if (err) {
      return done(`Could not connect to MongoDB at "${input}". Make sure that a database is installed and running on that host/port before proceeding`);
    }

    userModel.countDocuments(validateEmptyUserCollection(input, done));
  });
};

const disconnectDatabase = (err) => {
  if (err) {
    throw err;
  }

  mongoose.connection.close();
};

const createAdmin = (answers) => {
  return (err) => {
    if (err) {
      throw err;
    }

    const {
      login,
      password,
    } = answers;

    const admin = new userModel({
      login,
      password,
    });

    admin.save(disconnectDatabase);
  };
};

const createDotenvFile = (answers) => {
  return (err, data) => {
    if (err) {
      throw err;
    }

    const {
      mongoUri,
    } = answers;

    const mustacheParams = {
      mongoUri,
    };

    const output = mustache.render(data, mustacheParams);

    fs.writeFile(dotenvPath, output, 'utf8', createAdmin(answers));
  };
};

const inquireInitParams = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'mongoUri',
        message: 'What will be the URI for the MongoDB intance this server will connect to?',
        default: 'mongodb://localhost:27017/drexel',
        validate: validateMongoUri,
      },
      {
        type: 'input',
        name: 'login',
        message: 'What will be the login name of the administrator account for this server?',
        default: 'admin',
        validate: validateLoginName,
      },
      {
        type: 'password',
        name: 'password',
        message: 'What will be the password for the administrator account (this must be a minimum of 8 characters)?',
        validate: validatePassword,
      },
    ])
    .then((answers) => {
      fs.readFile(dotenvTemplatePath, 'utf8', createDotenvFile(answers));
    });
};

fs.stat(dotenvPath, (err, stat) => {
  if (!err) {
    throw new Error('A dot env file (".env") is already present. To re-initialize the app, run "npm run reset"');
  }

  if (err.code !== 'ENOENT') {
    throw new Error(`Error was returned trying to access the dot env file (".env"): ${err.message}`);
  }

  return inquireInitParams();
});
