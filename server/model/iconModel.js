const mongoose = require('mongoose');

const iconModel = mongoose.model('iconModel', new mongoose.Schema({
  className: String,
  label: String,
  repoName: String,
  url: String,
  filename: String,
}));

module.exports = iconModel;