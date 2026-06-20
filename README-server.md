Zentrix simple backend

Quick start:

1. Install dependencies

```powershell
cd c:\Users\kamal\web
npm install
```

2. Run server

```powershell
npm start
```

Server endpoints:
- POST /api/bookings  (JSON body) — adds booking
- GET  /api/bookings?pass=zentrix  — lists bookings (admin passphrase)

Note: This is a minimal development server storing data in `data/bookings.json`. For production use, replace with a proper database and secure auth.