

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

class Calculator {
  add(a, b) {
        return a + b;
      }
    
      subtract(a, b) {
        return a - b;
      }
    
      multiply(a, b) {
        return a * b;
      }
    
      divide(a, b) {
        return a / b;
      }
  // ... (unchanged)
}

const calculator = new Calculator();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post('/rpc', (req, res) => {
  const { method, params } = req.body;

  if (calculator[method] && typeof calculator[method] === 'function') {
    const result = calculator[method](...params);
    res.json({ result });
  } else {
    res.status(404).json({ error: 'Method not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});