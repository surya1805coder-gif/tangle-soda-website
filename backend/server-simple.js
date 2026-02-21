const express = require('express');

console.log('Server.js starting...');

const app = express();
app.use(express.json());

console.log('Registering routes...');

// Test GET
app.get('/test', (req, res) => {
  console.log('GET /test was called');
  res.json({ message: 'GET works' });
});

// Test POST
app.post('/test', (req, res) => {
  console.log('POST /test was called with:', req.body);
  res.json({ message: 'POST works', received: req.body });
});

console.log('Routes registered. Starting server...');

app.listen(5000, () => {
  console.log('Server listening on 5000');
});
