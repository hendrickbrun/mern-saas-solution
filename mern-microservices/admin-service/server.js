const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Admin service running on port ${process.env.PORT}`)))
  .catch(err => console.error(err));
