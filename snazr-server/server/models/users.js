const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  id: String,
  name: Object,
  photos: Array
});

// userSchema.pre('save', (next) => {

// });

module.exports = mongoose.model('User', userSchema);