const express = require('express');
const app = express();

app.use(express.json());

// Test route
app.post('/test-post', (req, res) => {
  res.json({ message: 'POST /test-post works!', body: req.body });
});

app.get('/test-get', (req, res) => {
  res.json({ message: 'GET /test-get works!' });
});

app.listen(5001, () => {
  console.log('✅ Test server on http://localhost:5001');
});
