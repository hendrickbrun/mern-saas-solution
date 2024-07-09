const express = require('express');
const router = express.Router();
const { Admin } = require('./models');

// Add a new admin
router.post('/admins', async (req, res) => {
  const admin = new Admin(req.body);
  await admin.save();
  res.status(201).send(admin);
});

// Get all admins
router.get('/admins', async (req, res) => {
  const admins = await Admin.find({});
  res.send(admins);
});

// Get a specific admin
router.get('/admins/:id', async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  res.send(admin);
});

// Update a specific admin
router.put('/admins/:id', async (req, res) => {
  const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(admin);
});

// Delete a specific admin
router.delete('/admins/:id', async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
