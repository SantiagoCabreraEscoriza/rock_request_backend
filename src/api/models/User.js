const mongoose = require('mongoose');

const federatedCredentialSchema = new mongoose.Schema({
  provider: String,
  subject: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String },
  federated: [federatedCredentialSchema],
  password: { type: String }
});

module.exports = mongoose.model('User', userSchema);
