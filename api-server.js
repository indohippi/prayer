// api-server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

const getDailyVerses = require('./api/daily-verses');
const generatePrayer = require('./api/generate-prayer');

app.post('/api/daily-verses', getDailyVerses);
app.post('/api/generate-prayer', generatePrayer);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});