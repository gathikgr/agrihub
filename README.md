# AgriSync — AI-Powered Pre-Harvest Coordination Platform

Production-oriented monorepo with:
- `frontend/`: Next.js App Router + TypeScript + Tailwind + React Query + i18next
- `supabase/`: complete schema and RLS policies
- `ml-service/`: FastAPI prediction service (`/predict-price`, `/recommend-crop`, `/storage-decision`)

## Setup

1. Copy env values:
```bash
cp .env.example .env
```
2. Run frontend:
```bash
cd frontend
npm install
npm run dev
```
3. Run ML service:
```bash
cd ml-service
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
4. Apply SQL in Supabase:
- `supabase/schema.sql`
- `supabase/rls.sql`

## Feature Highlights

- Full-screen language selector (English/Hindi/Telugu) persisted in localStorage and users.language.
- Role dashboards: farmer, buyer, transporter, storage provider, admin.
- Farmer showcase: AI recommendation, price chart, weather, mandi feed, expenses, storage/transporter snapshots.
- Route protection middleware with demo auth bootstrap (`/auth` -> role-based entry).
- Razorpay order creation endpoint.
- Mock mandi API + weather integration.

## Demo Login
- Open `/auth`, select role, continue to dashboard (sets secure demo auth cookies).

## Demo Routes
- `/auth`
- `/farmer`
- `/buyer`
- `/transporter`
- `/storage`
- `/admin`
