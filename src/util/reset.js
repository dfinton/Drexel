const fs = require('fs');
const inquirer = require('inquirer');
const mongoose = require('mongoose');
const path = require('path');

require('../model/User');
const userModel = mongoose.model('User');

const rootDir = path.join(__dirname, '..');
const dotenvPath = path.join(rootDir, '.env');

// TODO: write a reset script :^)
