// In risk-assessment-service/index.js or app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 5003;

// Define the route for /riskassessments
app.get('/riskassessments', (req, res) => {
    res.status(200).send('Risk Assessment Service is up and running.');
});

app.listen(port, () => {
    console.log(`Risk Assessment Service running on port ${port}`);
});
