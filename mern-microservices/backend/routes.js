const express = require('express');
const router = express.Router();
const { Company, Risk } = require('./models');

// Add a new company
router.post('/companies', async (req, res) => {
  const company = new Company(req.body);
  await company.save();
  res.status(201).send(company);
});

// Get all risks for a company
router.get('/companies/:id/risks', async (req, res) => {
  const risks = await Risk.find({ companyId: req.params.id });
  res.send(risks);
});

// Add a new risk for a company
router.post('/companies/:id/risks', async (req, res) => {
  const risk = new Risk({
    ...req.body,
    companyId: req.params.id
  });
  await risk.save();
  res.status(201).send(risk);
});

// Update a specific risk
router.put('/risks/:id', async (req, res) => {
  const risk = await Risk.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(risk);
});

// Delete a specific risk
router.delete('/risks/:id', async (req, res) => {
  await Risk.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Get risks based on framework
router.get('/framework/:framework/risks', async (req, res) => {
  const risks = await Risk.find({ framework: req.params.framework });
  res.send(risks);
});

module.exports = router;
