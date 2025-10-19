# SpendWise — Agent-First Starter

This is a starter full-stack project (React + Express + MongoDB) with an "agent-first" design: an autonomous agent analyzes user transactions, suggests micro-savings, and proposes weekly auto-saves (simulation only).

## Quick local run (without Docker)

### Prerequisites
- Node 18+ and npm
- MongoDB running locally on default port (or MongoDB Atlas)

### Backend
1. cd backend
2. npm install
3. copy .env.example to .env (adjust MONGODB_URI if needed)
4. npm run dev

### Frontend
1. cd frontend
2. npm install
3. create a file `.env` with the line: `VITE_API_BASE=http://localhost:4000`
4. npm run dev

Open frontend at http://localhost:5173

## Run with Docker Compose (optional)
1. docker-compose up --build
This builds backend and runs MongoDB; frontend will also be served by Vite.

## Testing the agent and features
- Record an expense via frontend UI or via curl:
  curl -X POST http://localhost:4000/api/transactions -H "Content-Type: application/json" -d '{"amount":200,"category":"food","note":"lunch","userId":"default-user"}'

- Manually trigger the agent:
  curl -X POST http://localhost:4000/api/agent/run -H "Content-Type: application/json" -d '{"userId":"default-user"}'

- Get analysis:
  curl http://localhost:4000/api/transactions/analysis?userId=default-user

## What to improve next
- Add authentication and multi-user support
- Replace heuristic analysis with ML models or fine-tuned LLM prompts
- Implement secure bank integrations for real auto-transfers (requires regulatory & user consent)
