require('babel-register');
const configCreator = require('./webpack.config.creator');


console.log('HERE');

module.exports = configCreator.default(true);


