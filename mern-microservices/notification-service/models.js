const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  message: String,
  date: Date,
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = { Notification };
