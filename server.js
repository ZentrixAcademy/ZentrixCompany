const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const DATA_DIR = path.join(__dirname, 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const ADMIN_PASSPHRASE = 'zentrix';

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(BOOKINGS_FILE)) fs.writeFileSync(BOOKINGS_FILE, '[]', 'utf8');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '8mb' }));

function readBookings() {
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    console.error('readBookings error', e);
    return [];
  }
}

function writeBookings(list) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (e) {
    console.error('writeBookings error', e);
  }
}

// Public: add booking
app.post('/api/bookings', (req, res) => {
  const payload = req.body;
  if (!payload || !payload.name || !payload.bookingText) {
    return res.status(400).json({ error: 'invalid booking' });
  }
  const all = readBookings();
  const item = Object.assign({}, payload, { id: Date.now() });
  all.unshift(item);
  writeBookings(all);
  res.json({ ok: true, booking: item });
});

// Admin: list bookings (simple passphrase auth via query param)
app.get('/api/bookings', (req, res) => {
  const pass = req.query.pass || req.get('x-admin-pass');
  if (!pass || pass !== ADMIN_PASSPHRASE) return res.status(401).json({ error: 'unauthorized' });
  const all = readBookings();
  res.json({ ok: true, bookings: all });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Zentrix API listening on http://localhost:${port}`));
