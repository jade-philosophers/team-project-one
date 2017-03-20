const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userId: String,
  pushToken: String,
  photos: Array
});

// userSchema.pre('save', (next) => {

// });

module.exports = mongoose.model('User', userSchema);