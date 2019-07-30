const logger = require('../utils/logger.js');
const mongoose = require('mongoose');

const connect = (config = {}) => {
  const user = config.username ? `${config.username}:${config.password}@` : '';
  const url = `mongodb://${user}${config.host}:${config.port}/${config.dbName}`;
  logger.info(url);
  mongoose.connect(url);
}

module.exports = connect;