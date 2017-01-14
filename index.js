require('babel-core/register');
require('babel-polyfill');
require('dotenv').config({ path: process.env.ENV_FILE });
require('./src');