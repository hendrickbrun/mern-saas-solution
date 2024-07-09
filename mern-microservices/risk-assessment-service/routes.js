const express = require('express');
const router = express.Router();
const { Risk } = require('./models');

// Add a new risk
router.post('/risks', async (req, res) => {
  const risk = new Risk(req.body);
  await risk.save();
  res.status(201).send(risk);
});

// Get all risks
router.get('/risks', async (req, res) => {
  const risks = await Risk.find({});
  res.send(risks);
});

// Get risks by company
router.get('/risks/company/:companyId', async (req, res) => {
  const risks = await Risk.find({ companyId: req.params.companyId });
  res.send(risks);
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

module.exports = router;
