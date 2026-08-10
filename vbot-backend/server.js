// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ensureSchema } = require('./db');
const bookingsRouter = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 4000;

// Allow requests from your Angular app's origin(s).
// CORS_ORIGIN in .env can be a comma-separated list, e.g.
// "http://localhost:4200,https://yourdomain.com"
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:4200')
  .split(',')
  .map((o) => o.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/bookings', bookingsRouter);

async function start() {
  try {
    await ensureSchema();
    console.log('Database schema ready.');

    app.listen(PORT, () => {
      console.log(`Vbot backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
