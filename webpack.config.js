require('babel-register');
const configCreator = require('./webpack.config.creator');

const prod = process.env.NODE_ENV === 'production';
const server = process.env.IS_SERVER === 'true';

module.exports = configCreator.default(server, prod);
