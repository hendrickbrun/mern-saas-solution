const express = require('express');
const router = express.Router();
const { Notification } = require('./models');

// Add a new notification
router.post('/notifications', async (req, res) => {
  const notification = new Notification(req.body);
  await notification.save();
  res.status(201).send(notification);
});

// Get all notifications
router.get('/notifications', async (req, res) => {
  const notifications = await Notification.find({});
  res.send(notifications);
});

// Get notifications by user
router.get('/notifications/user/:userId', async (req, res) => {
  const notifications = await Notification.find({ userId: req.params.userId });
  res.send(notifications);
});

// Update a specific notification
router.put('/notifications/:id', async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(notification);
});

// Delete a specific notification
router.delete('/notifications/:id', async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
