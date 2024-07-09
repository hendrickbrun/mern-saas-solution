const mongoose = require('mongoose');

const RiskSchema = new mongoose.Schema({
  companyId: mongoose.Schema.Types.ObjectId,
  risk: String,
  control: String,
  testProcedure: String,
  framework: String,
  bestPractice: String,
});

const Risk = mongoose.model('Risk', RiskSchema);

module.exports = { Risk };
