// In admin-service/index.js or app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 5005;

// Define the route for /admins
app.get('/admins', (req, res) => {
    res.status(200).send('Admin Service is up and running.');
});

app.listen(port, () => {
    console.log(`Admin Service running on port ${port}`);
});
