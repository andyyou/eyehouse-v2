var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var House = new Schema({
  name: String,
  description: String,
  cover: String,
  photos: Array
});

module.exports = mongoose.model('House', House);
