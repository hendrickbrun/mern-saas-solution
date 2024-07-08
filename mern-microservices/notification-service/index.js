const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5004;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Notification = mongoose.model('Notification', new mongoose.Schema({
    title: String,
    message: String,
}));

app.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Notification Service running on port ${port}`);
});
