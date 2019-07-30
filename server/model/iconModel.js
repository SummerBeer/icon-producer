const mongoose = require('mongoose');

const iconModel = mongoose.model('iconModel', new mongoose.Schema({
  className: String,
  label: String,
  repoId: String
}));

module.exports = iconModel;