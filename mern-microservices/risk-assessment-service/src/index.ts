// admin-service/src/index.ts
import express from 'express';

const app = express();
const port = process.env.PORT || 5005;

app.get('/admins', (req, res) => {
  res.send('Admin Service');
});

app.listen(port, () => {
  console.log(`Admin Service running on port ${port}`);
});
