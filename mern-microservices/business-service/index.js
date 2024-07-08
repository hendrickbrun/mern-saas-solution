const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5002;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Business = mongoose.model('Business', new mongoose.Schema({
    name: String,
    address: String,
}));

app.get('/businesses', async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Business Service running on port ${port}`);
});
