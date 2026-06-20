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

Frontend changes: `script.js` attempts to POST bookings to `/api/bookings` by default. If your frontend is served from a different origin, set `window.ZENTRIX_API_BASE` or configure a proxy/redirect.

Netlify deployment (frontend only):

1. Add this repo to Netlify.
2. Set the publish directory to the project root (`.`).
3. If your backend is hosted elsewhere, edit `netlify.toml` and set the backend URL:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR_BACKEND_URL_HERE/:splat"
  status = 200
  force = true
```

Vercel deployment (frontend only):

1. Add this repo to Vercel.
2. Deploy the `main` branch.
3. If your backend is hosted elsewhere, add a `vercel.json` file or set `window.ZENTRIX_API_BASE` in `index.html`.

Example `vercel.json` for backend rewrites:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://YOUR_BACKEND_URL_HERE/api/:path*"
    }
  ]
}
```

Example `index.html` override:

```html
<script>
  window.ZENTRIX_API_BASE = 'https://your-backend.example.com';
</script>
```

Because the backend is a simple Express server, it is easiest to deploy it separately on a Node host and then point the frontend to that backend.

Security note: This server uses a hard-coded passphrase and file-based storage for demo purposes only. For production, use proper authentication and a database.