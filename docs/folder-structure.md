# Folder Structure

## Project Directory Layout

```
.
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── environment.js
│   │   └── constants.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── gatePassController.js
│   │   └── authController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── GatePass.js
│   │   ├── Approval.js
│   │   └── AuditLog.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── gatePasses.js
│   │   ├── auth.js
│   │   └── index.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── services/
│   │   ├── userService.js
│   │   ├── gatePassService.js
│   │   ├── emailService.js
│   │   └── pdfService.js
│   ├── utils/
│   │   ├── logger.js
│   │   ├── validators.js
│   │   ├── tokenUtils.js
│   │   └── helpers.js
│   └── app.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── database.md
│   ├── diagrams/
│   └── ...
├── migrations/
│   └── (database migration files)
├── seeds/
│   └── (database seed files)
├── public/
│   ├── index.html
│   ├── css/
│   └── js/
├── .env.example
├── package.json
├── server.js
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Directory Descriptions

### `/src`
Main application source code.

### `/src/config`
Configuration files for database, environment variables, and constants.

### `/src/controllers`
Request handlers that process incoming requests and return responses.

### `/src/models`
Database models and schemas.

### `/src/routes`
API route definitions and endpoint mappings.

### `/src/middleware`
Express middleware for authentication, error handling, request validation.

### `/src/services`
Business logic layer with reusable service functions.

### `/src/utils`
Utility functions, helpers, and common tools.

### `/tests`
Test files organized by type (unit, integration, e2e).

### `/docs`
Project documentation and diagrams.

### `/migrations`
Database schema migration scripts.

### `/seeds`
Database seed/fixture data for development and testing.

### `/public`
Static assets served to clients.

## File Naming Conventions

- Controllers: `*Controller.js` (camelCase)
- Models: `*.js` (PascalCase)
- Routes: `*.js` (lowercase)
- Services: `*Service.js` (camelCase)
- Tests: `*.test.js` or `*.spec.js`
- Config: `*.js` (camelCase)

## Import Path Aliases

Use path aliases for cleaner imports:

```javascript
import userService from '@services/userService';
import { config } from '@config';
```

Configure in `package.json` or `tsconfig.json`:
```json
{
  "paths": {
    "@services/*": ["src/services/*"],
    "@models/*": ["src/models/*"],
    "@config/*": ["src/config/*"]
  }
}
```
