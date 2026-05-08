import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

// 🔐 Put your real balance API URL + key here
const BALANCE_API_URL = process.env.BALANCE_API_URL || 'https://api.example.com/v1/balance';
const BALANCE_API_KEY = process.env.BALANCE_API_KEY || 'REPLACE_ME';

async function getBalance() {
  const res = await fetch(BALANCE_API_URL, {
    headers: {
      'Authorization': `Bearer ${BALANCE_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Balance API error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.balance ?? data;
}

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'titan-bot' });
});

// Main balance endpoint
app.get('/balance', async (req, res) => {
  try {
    const balance = await getBalance();
    res.json({ balance });
  } catch (err) {
    console.error('Error in /balance:', err.message);
    res.status(500).json({ error: 'Failed to fetch balance', detail: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Titan-bot running on port ${port}`);
});