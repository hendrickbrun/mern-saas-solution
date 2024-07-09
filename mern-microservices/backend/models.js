const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: String,
  industry: String,
  location: String,
  publicOrPrivate: String,
  numberOfEmployees: Number,
});

const RiskSchema = new mongoose.Schema({
  companyId: mongoose.Schema.Types.ObjectId,
  risk: String,
  control: String,
  testProcedure: String,
  framework: String, // e.g., 'NIST', 'ISO/IEC 27001', 'CIS', etc.
  bestPractice: String, // Details or references to best practices
});

const Company = mongoose.model('Company', CompanySchema);
const Risk = mongoose.model('Risk', RiskSchema);

module.exports = { Company, Risk };
