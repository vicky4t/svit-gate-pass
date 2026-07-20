# API Documentation

## Base URL

```
https://api.example.com/v1
```

## Authentication

All API requests require authentication via JWT token in the Authorization header.

```
Authorization: Bearer <token>
```

## Endpoints

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get user details
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Gate Passes
- `GET /gate-passes` - List all gate passes
- `GET /gate-passes/:id` - Get gate pass details
- `POST /gate-passes` - Create new gate pass
- `PUT /gate-passes/:id` - Update gate pass
- `DELETE /gate-passes/:id` - Delete gate pass
- `POST /gate-passes/:id/approve` - Approve a gate pass
- `POST /gate-passes/:id/reject` - Reject a gate pass

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/register` - User registration

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

## Error Handling

See error codes and messages in responses with appropriate HTTP status codes.

## Rate Limiting

API requests are rate-limited. Check `X-RateLimit-*` headers in responses.
