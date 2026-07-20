# Coding Guidelines

## JavaScript/TypeScript Standards

### Code Style

- Use consistent indentation (2 spaces)
- Use semicolons at end of statements
- Use single quotes for strings
- Use template literals for string interpolation
- Use arrow functions for callbacks

```javascript
// Good
const getUserById = (id) => {
  return User.findById(id);
};

// Avoid
const getUserById = function(id) {
  return User.findById(id);
}
```

### Naming Conventions

- **Variables/Functions**: camelCase
- **Classes/Models**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Database tables**: snake_case
- **File names**: camelCase.js or PascalCase.js

```javascript
// Good
const MAX_RETRY_COUNT = 3;
const getUserData = () => {};
class UserController {}

// Avoid
const max_retry_count = 3;
const get_user_data = () => {};
class user_controller {}
```

### Comments

Write meaningful comments only when explaining complex logic:

```javascript
// Calculate expiry time using 15-minute window
const expiryTime = Date.now() + (15 * 60 * 1000);
```

Avoid obvious comments:

```javascript
// Bad
// Set user id to 5
userId = 5;
```

### Error Handling

Always handle errors explicitly:

```javascript
// Good
try {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  return user;
} catch (error) {
  logger.error('Failed to fetch user', error);
  throw new ApplicationError('User fetch failed', 500);
}

// Avoid
async function getUser(id) {
  return await User.findById(id);
}
```

### Async/Await

Prefer async/await over Promise chains:

```javascript
// Good
const fetchData = async () => {
  try {
    const data = await api.get('/data');
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Avoid
const fetchData = () => {
  return api.get('/data')
    .then(data => data)
    .catch(error => handleError(error));
};
```

## Database Access

### Query Structure

- Use parameterized queries to prevent SQL injection
- Use ORM methods when available
- Add indexes for frequently queried fields

```javascript
// Good - using ORM
const user = await User.findOne({ email, status: 'active' });

// Avoid - string concatenation
const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
```

### Transaction Management

Wrap related database operations in transactions:

```javascript
const result = await sequelize.transaction(async (transaction) => {
  const user = await User.create(userData, { transaction });
  await Audit.create(auditData, { transaction });
  return user;
});
```

## API Design

### Endpoint Naming

Use nouns for resources, verbs for actions:

```
GET /users           # Get all users
GET /users/:id       # Get specific user
POST /users          # Create user
PUT /users/:id       # Update user
DELETE /users/:id    # Delete user
POST /users/:id/activate  # Perform action
```

### Request/Response Format

Always validate request data and return consistent responses:

```javascript
// Request validation
const { error, value } = schema.validate(req.body);
if (error) {
  return res.status(400).json({ success: false, error: error.details });
}

// Response format
res.json({
  success: true,
  data: result,
  message: 'Operation successful'
});
```

### HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Testing

### Test File Organization

```
src/
  services/
    userService.js
tests/
  unit/
    services/
      userService.test.js
```

### Naming Tests

Use descriptive test names:

```javascript
// Good
describe('UserService', () => {
  it('should return user when valid ID is provided', () => {
    // test code
  });
});

// Avoid
describe('UserService', () => {
  it('works', () => {
    // test code
  });
});
```

### Code Coverage

Target minimum 80% code coverage:

```bash
npm run test:coverage
```

## Documentation

### Function Documentation

Document all public functions:

```javascript
/**
 * Retrieves a user by ID
 * @param {string} userId - The user ID
 * @returns {Promise<User>} - User object
 * @throws {NotFoundError} - If user doesn't exist
 */
const getUserById = async (userId) => {
  // implementation
};
```

### README Requirements

Every module should have a README explaining:
- Purpose
- Usage examples
- Configuration options
- Common errors

## Git Workflow

- Use descriptive commit messages
- Commit frequently in logical chunks
- Reference issues in commits: `Fix #123`
- Create feature branches from main: `feature/user-auth`

## Performance

- Lazy load large datasets
- Cache frequently accessed data
- Use database indexes
- Minimize external API calls
- Implement rate limiting

## Security

See [security.md](security.md) for security guidelines.
