# Vbot Backend — Demo Bookings

A small Express + MySQL API that saves demo bookings from your Angular
`demo.ts` form and emails a notification to `whatsappvbot@gmail.com`.

## 1. Install dependencies

```bash
cd vbot-backend
npm install
```

## 2. Configure environment variables

Copy the example file and fill in your real values:

```bash
cp .env.example .env
```

Open `.env` and fill in:

- **DB_HOST / DB_PORT / DB_USER / DB_PASSWORD / DB_NAME** — from your
  hosted MySQL provider's dashboard (PlanetScale, Railway, RDS,
  DigitalOcean Managed MySQL, Hostinger, etc. all show you these on
  the database's "Connect" page).
- **DB_SSL** — set to `true` if your provider requires SSL (most
  managed hosts do — check their connection docs; if unsure, try
  `false` first and switch to `true` if you get a connection error
  mentioning SSL/TLS).
- **GMAIL_APP_PASSWORD** — see step 3 below, this is NOT your normal
  Gmail password.

## 3. Generate a Gmail App Password (required)

Gmail blocks regular password logins from apps like this one. You need
a 16-character "App Password" instead:

1. Go to your Google Account → **Security**.
2. Turn on **2-Step Verification** if it isn't already on (required
   for App Passwords to be available).
3. Search settings for **App Passwords** (or go directly to
   `myaccount.google.com/apppasswords`).
4. Create one — name it something like "Vbot Backend".
5. Google gives you a 16-character password — paste that into
   `GMAIL_APP_PASSWORD` in your `.env` (no spaces).

## 4. Run the server

```bash
npm run dev
```

You should see:
```
Database schema ready.
Vbot backend running on http://localhost:4000
```

The `bookings` table is created automatically on first run — no manual
SQL needed.

## 5. Test it

```bash
curl -X POST http://localhost:4000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","date":"2026-08-15","time":"10:00 AM"}'
```

Check your `whatsappvbot@gmail.com` inbox — you should get a
notification email within a few seconds, and a row should appear in
the `bookings` table.

## API Reference

### `POST /api/bookings`
Saves a booking and sends two emails (one to your team inbox, one
confirmation to the customer).

Body:
```json
{
  "name": "Jane Doe",
  "email": "jane@brand.com",
  "phone": "+91 90000 00000",
  "company": "Jane's Store",
  "notes": "Interested in Shopify sync",
  "date": "2026-08-15",
  "time": "10:00 AM"
}
```

### `GET /api/bookings`
Returns all bookings, most recent first. No auth is applied yet — add
some (e.g. an API key check or proper admin auth) before exposing this
publicly.

## Deploying

When you're ready to deploy (Railway, Render, a VPS, etc.):
- Set the same environment variables in your host's dashboard instead
  of a `.env` file.
- Update `CORS_ORIGIN` in production to your real Angular domain,
  not `localhost:4200`.
- Make sure your hosted MySQL provider allows connections from your
  backend's IP address (some require you to whitelist it).
