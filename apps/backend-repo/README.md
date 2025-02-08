# EBUDDY Backend Repository

This repository contains the backend implementation for the EBUDDY technical test, built with Express.js and Firebase.

## Prerequisites

- Node.js v20
- Firebase CLI
- Firebase Emulator Suite

## Project Structure

```
backend-repo/
├── config/
│   └── firebaseConfig.ts      # Firebase configuration
├── controller/
│   └── api.ts                 # API controllers
├── core/
│   └── app.ts                 # Express app setup
├── entities/
│   └── user.ts                # Type definitions
├── middleware/
│   └── authMiddleware.ts      # Authentication middleware
├── repository/
│   └── userCollection.ts      # Firestore operations
├── routes/
│   └── userRoutes.ts          # API routes
└── utils/
    └── scripts/
        └── seed.ts            # Database seeding script
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Firebase Emulator:
   ```bash
   firebase init emulators
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Start the development server with emulators:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run build`: Compiles TypeScript to JavaScript
- `npm run build:watch`: Watches for changes and recompiles
- `npm run serve`: Starts Firebase emulators for functions and firestore
- `npm run serve:seed`: Starts Firestore emulator and seeds data
- `npm run shell`: Starts Firebase Functions shell
- `npm run deploy`: Deploys functions to Firebase
- `npm run dev`: Builds and starts all emulators
- `npm run seed`: Runs the database seeding script

## API Endpoints

### Get User Data
```http
GET /users/:userId
Authorization: Bearer <token>
```

### Update User Data
```http
PATCH /users/:userId
Authorization: Bearer <token>

{
  "totalAverageWeightRatings": number,
  "numberOfRents": number,
  "recentlyActive": number
}
```

## Testing

For local testing, you can use the test token:
```http
Authorization: Bearer test-token
```

This token will work when running in emulator mode.

## Database Seeding

The project includes a seeding script that populates the Firestore emulator with sample data. To run it:

1. Start the Firestore emulator:
   ```bash
   npm run serve:seed
   ```

2. In another terminal, run the seeding script:
   ```bash
   npm run seed
   ```

This will create sample users with the following data:
- User 1: High activity, recent engagement
- User 2: High activity, less recent engagement
- User 3: Lower activity, less recent engagement

## Environment Variables

The following environment variables are used:
- `FIRESTORE_EMULATOR_HOST`: Set automatically when running emulators
- `FUNCTIONS_EMULATOR`: Set automatically when running in emulator mode

## Firebase Emulator

When running the emulators, you can access:
- Functions Emulator: http://127.0.0.1:5001
- Firestore Emulator: http://127.0.0.1:8080
