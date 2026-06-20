Zentrix Academy (frontend + optional backend)

Frontend: simple static site (index.html, styles.css, script.js).

Optional backend (recommended for syncing bookings across devices):

1. Install Node.js (v16+ recommended)
2. From project root run:

```powershell
npm install
npm start
```

This starts a minimal Express server on port 4000 that exposes:
- POST /api/bookings — add a booking (JSON body)
- GET  /api/bookings?pass=zentrix — list bookings (admin passphrase)

Frontend changes: `script.js` attempts to POST bookings to `/api/bookings`. If your frontend is served from a different origin, set `API_BASE` or proxy requests appropriately (or serve frontend from same host).

Security note: This server uses a hard-coded passphrase and file-based storage for demo purposes only. For production, use proper authentication and a database.