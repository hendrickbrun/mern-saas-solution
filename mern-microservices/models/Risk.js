const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Risk', riskSchema);
