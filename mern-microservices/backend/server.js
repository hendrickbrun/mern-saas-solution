const express = require('express');
const mongoose = require('mongoose');
const companyRoutes = require('./routes');
const app = express();

app.use(express.json());
app.use('/api', companyRoutes);

mongoose.connect('mongodb://localhost:27017/mern-saas-solution', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000, () => console.log('Server is running on port 3000')))
  .catch(err => console.error(err));
