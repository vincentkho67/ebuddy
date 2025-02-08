# EBUDDY Technical Test Solution

This monorepo contains the implementation of the EBUDDY technical test, combining both frontend and backend solutions using Turborepo.

## Prerequisites

- Node.js v20 or higher
- npm v10.8.2 or higher
- Firebase CLI
- Firebase Emulator Suite

## Project Structure

```
ebuddy-app/
├── apps/
│   ├── backend-repo/    # Express.js backend
│   └── frontend-repo/   # Next.js frontend
├── packages/
│   ├── shared/          # Shared types and utilities
│   ├── ui/             # Shared UI components
│   ├── eslint-config/  # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── package.json
```

## Getting Started

1. Install Firebase CLI if you haven't:
```bash
npm install -g firebase-tools
```

2. Install dependencies from the root directory:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env-example` to `.env` in both `apps/frontend-repo` and `apps/backend-repo`

## Running the Project

### Development Mode (Running Everything)

To run both frontend and backend with Firebase emulators:

```bash
npm run dev:all
```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:5001
- Firebase Auth Emulator at http://localhost:9099
- Firebase Functions Emulator
- Firebase Firestore Emulator

### Running Individual Parts

Backend only:
```bash
turbo dev --filter=backend-repo
```

Frontend only:
```bash
turbo dev --filter=frontend-repo
```

## Testing the Application

1. Start the application in development mode:
```bash
npm run dev:all
```

2. Access the frontend at http://localhost:3000

3. Login using test credentials:
```
Email: test@example.com
Password: password123
```

4. Test the user management functionality:
   - View user data
   - Update user information
   - Check real-time updates

### Seeding Test Data

1. Start The Application

2. In another terminal, run the seeding script:
```bash
npm run seed
```

This will create three test users:
- User 1: High activity, recent engagement
- User 2: High activity, less recent engagement
- User 3: Lower activity, less recent engagement

## Build

To build all apps and packages:

```bash
npm run build
```

## Available Scripts

- `npm run dev:all` - Run all services in development mode
- `npm run build` - Build all applications
- `npm run lint` - Lint all applications
- `npm run format` - Format code using Prettier
- `npm run start` - Start all applications in production mode

## Project Features

### Backend (Express.js)
- Firebase SDK integration
- User management endpoints
- Authentication middleware
- Firestore database integration

### Frontend (Next.js)
- Material-UI integration
- Redux state management
- Firebase authentication
- Responsive design
- User management interface

### Shared Features
- TypeScript configurations
- ESLint configurations
- Shared types and interfaces
- Common UI components

## Testing Endpoints

You can test the API endpoints using curl or Postman:

```bash
# Fetch user data
curl -H "Authorization: Bearer test-token" http://localhost:5001/ebuddy-e0146/us-central1/api/users/user1

# Update user data
curl -X PATCH \
  -H "Authorization: Bearer test-token" \
  -H "Content-Type: application/json" \
  -d '{"totalAverageWeightRatings": 4.5}' \
  http://localhost:5001/ebuddy-e0146/us-central1/api/users/user1
```

## Troubleshooting

1. If you encounter EADDRINUSE errors, make sure no other service is running on the required ports:
   - 3000 (Frontend)
   - 5001 (Backend)
   - 9099 (Firebase Auth)
   - 8080 (Firestore)

2. If the Firebase emulators fail to start:
   ```bash
   firebase emulators:start --clear
   ```

3. To clear all emulator data:
   ```bash
   firebase emulators:start --clear
   ```

## Additional Notes

- The project uses Firebase Emulators for local development
- Authentication is handled through Firebase Auth
- The frontend implements Material-UI for responsive design
- State management is handled through Redux
- API calls are abstracted in the frontend's api directory