# Full Stack Application Setup Guide

## Prerequisites

- MongoDB (installed and running)
- Node.js v20.x
- npm (comes with Node.js)

## Backend Setup (Express)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
PORT=8001
MONGODB_URI=mongodb://localhost:27017/text_analyzer
JWT_SECRET=your_jwt_secret
NODE_ENV=development
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:8001`

## Frontend Setup (Next.js)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```bash
AUTH_SECRET=your_auth_secret # Added by `npx auth`. Read more: https://cli.authjs.dev
MONGODB_URI=mongodb://localhost:27017/text_analyzer

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret


NEXT_PUBLIC_API_BASE_URL=http://localhost:8001/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend application will run on `http://localhost:3000`

## Running Both Applications

You'll need to run both applications simultaneously. Open two terminal windows:

### Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

### Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## Verifying the Setup

1. Backend API should be accessible at `http://localhost:8001`
2. Frontend application should be accessible at `http://localhost:3000`
3. MongoDB should be running on the default port `27017`

## Troubleshooting

- If MongoDB fails to connect, ensure the MongoDB service is running
- If ports are already in use, you may need to modify the port numbers in the respective configuration files
- Make sure all environment variables are properly set
