const mongoose = require('mongoose');

const repoMoel = mongoose.model('repoModel', new mongoose.Schema({
  repoName: String
}));

module.exports = repoMoel;