# Loan Decision Engine

Full-Stack app made with TypeScript on both the front and backend, that calculates loan approval based on a simple scoring algorithm.

## Tech Stack
- Backend: Node.js, Express, TypeScript
- Frontend: React, TypeScript, Axios

## How to run

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoint
POST /api/loan/decision

## Decision Logic
credit score = (modifier / amount) * period

- score >= 1, then loan is approved
- score < 1, then loan is rejected
- if loan is rejected, then the system tries to find the best possible loan solution

## Customers

Customers are hardcoded:

"49002010965": { hasDebt: true },
"49002010976": { hasDebt: false, creditModifier: 100 },
"49002010987": { hasDebt: false, creditModifier: 300 },
"49002010998": { hasDebt: false, creditModifier: 1000 },
