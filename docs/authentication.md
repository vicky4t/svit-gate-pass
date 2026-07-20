# Authentication

## Overview

The SVIT Gate Pass system uses JWT (JSON Web Token) based authentication for secure API access.

## Authentication Flow

1. User enters credentials (email/username and password)
2. System validates credentials against database
3. On success, server generates JWT token
4. Client stores token (localStorage, sessionStorage, or secure cookie)
5. Client includes token in Authorization header for subsequent requests

See [diagrams/auth-flow.png](diagrams/auth-flow.png) for visual authentication flow.

## JWT Token Structure

Tokens contain three parts separated by dots:

```
header.payload.signature
```

### Header
Contains token type and hashing algorithm.

### Payload
Contains claims:
- `sub`: User ID
- `email`: User email
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp
- `role`: User role

### Signature
HMAC-SHA256 hash to verify token authenticity.

## Token Expiration

- **Access Token**: 1 hour
- **Refresh Token**: 7 days

## Session Management

- Tokens are verified on each request
- Expired tokens trigger automatic refresh using refresh token
- Logout invalidates the refresh token

## Password Security

- Passwords are hashed using bcrypt
- Minimum 8 characters required
- Salt rounds: 10

## Two-Factor Authentication (Optional)

Can be implemented for additional security layer.
