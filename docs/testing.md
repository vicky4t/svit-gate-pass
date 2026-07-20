# Testing

## Overview

Comprehensive testing is essential to ensure code quality and reliability. This guide outlines testing strategies, tools, and best practices.

## Testing Pyramid

```
    /\
   /  \      E2E Tests (10%)
  /----\
 /      \    Integration Tests (30%)
/--------\
          Unit Tests (60%)
```

## Unit Tests

### Purpose
Test individual functions and components in isolation.

### Tools
- **Framework**: Jest, Mocha
- **Assertion**: Chai, Assert
- **Mocking**: Sinon, Jest mocks

### Example

```javascript
describe('calculateDiscount', () => {
  it('should return correct discount for valid percentage', () => {
    const price = 100;
    const discount = 20;
    const result = calculateDiscount(price, discount);
    expect(result).toBe(80);
  });

  it('should throw error for negative percentage', () => {
    expect(() => calculateDiscount(100, -20)).toThrow();
  });
});
```

### Running Unit Tests

```bash
npm run test                    # Run all tests
npm run test:watch             # Watch mode
npm run test:coverage          # With coverage report
npm run test -- --testNamePattern="pattern"  # Specific tests
```

### Coverage Goals
- Overall: 80%
- Critical paths: 100%
- Business logic: 90%

## Integration Tests

### Purpose
Test interactions between multiple components/services.

### Tools
- **API Testing**: Supertest, Axios
- **Database**: Test database, factories
- **Fixtures**: Seeded data

### Example

```javascript
describe('User API', () => {
  before(async () => {
    await setupTestDatabase();
  });

  after(async () => {
    await teardownTestDatabase();
  });

  it('should create and retrieve user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test' });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe('test@example.com');
  });
});
```

### Database Testing
- Use separate test database
- Reset data between tests
- Implement database factories for fixtures

```javascript
const userFactory = {
  create: async (attrs = {}) => {
    return await User.create({
      email: 'test@example.com',
      name: 'Test User',
      ...attrs
    });
  }
};
```

## End-to-End Tests

### Purpose
Test complete user workflows from UI to backend.

### Tools
- **Framework**: Cypress, Playwright, Selenium
- **Best for**: Critical business flows

### Example

```javascript
describe('Gate Pass Workflow', () => {
  it('should create and approve a gate pass', () => {
    cy.visit('/');
    cy.login('admin@example.com', 'password');
    
    cy.get('[data-testid="create-pass"]').click();
    cy.get('input[name="title"]').type('Campus Visit');
    cy.get('textarea[name="purpose"]').type('Meeting with department');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Gate pass created successfully').should('be.visible');
  });
});
```

## Performance Tests

### Purpose
Ensure application meets performance requirements.

### Tools
- **Load Testing**: k6, JMeter, Locust
- **Profiling**: Node.js profiler, Chrome DevTools

### Example

```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,  // 10 virtual users
  duration: '30s',
};

export default function () {
  const res = http.get('http://localhost:3000/api/gate-passes');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
}
```

## Security Tests

### Purpose
Identify security vulnerabilities.

### Tools
- **SAST**: SonarQube, ESLint security plugins
- **DAST**: OWASP ZAP, Burp Suite
- **Dependency Scanning**: Snyk, npm audit

```bash
# Audit dependencies
npm audit
npm audit fix

# SAST scanning
npm run lint

# Dependency check
npx snyk test
```

## Test Organization

```
tests/
├── unit/
│   ├── services/
│   │   └── userService.test.js
│   ├── models/
│   │   └── User.test.js
│   └── utils/
│       └── validators.test.js
├── integration/
│   ├── api/
│   │   ├── auth.test.js
│   │   ├── users.test.js
│   │   └── gatePasses.test.js
│   └── database/
│       └── migrations.test.js
├── e2e/
│   ├── auth.test.js
│   ├── gatePassWorkflow.test.js
│   └── reporting.test.js
├── fixtures/
│   ├── users.json
│   └── gatePasses.json
├── helpers/
│   ├── factories.js
│   ├── setupDb.js
│   └── testUtils.js
└── config/
    └── jest.config.js
```

## Test Data Management

### Factories
Use factory patterns for consistent test data:

```javascript
// Factory
const createUser = (overrides = {}) => ({
  email: 'test@example.com',
  name: 'Test User',
  role: 'student',
  status: 'active',
  ...overrides
});

// Usage
const user = createUser({ role: 'admin' });
```

### Fixtures
Pre-defined test data for consistent tests:

```json
{
  "users": [
    { "id": 1, "email": "admin@example.com", "role": "admin" }
  ]
}
```

## Mocking & Stubbing

### Mock External Services

```javascript
jest.mock('@services/emailService', () => ({
  sendEmail: jest.fn().mockResolvedValue(true)
}));

import { sendEmail } from '@services/emailService';

describe('Notifications', () => {
  it('should send email', async () => {
    await sendNotification('test@example.com');
    expect(sendEmail).toHaveBeenCalled();
  });
});
```

## Continuous Integration

### CI/CD Pipeline
```yaml
# GitHub Actions example
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage

- name: Upload to Codecov
  uses: codecov/codecov-action@v3
```

## Test Quality

### Good Practices
- One assertion per test (or related assertions)
- Descriptive test names
- Test behavior, not implementation
- Keep tests fast and isolated
- Use setup/teardown for test data

### Anti-Patterns
- Testing internal implementation
- Overlapping test coverage
- Flaky tests (unreliable)
- Tests dependent on execution order
- Over-mocking reducing actual coverage

## Test Metrics

- **Coverage**: Target 80%
- **Execution Time**: < 10 minutes for full suite
- **Pass Rate**: 100% before merge
- **Flakiness**: < 0.5%

## Running Test Suite

```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# E2E tests
npm run test:e2e

# All tests with coverage
npm run test:all

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Troubleshooting

### Common Issues

**Flaky Tests**
- Remove unnecessary delays (use proper waits)
- Ensure proper test data isolation
- Mock time-dependent functions

**Slow Tests**
- Reduce database operations
- Increase parallel test execution
- Use in-memory databases for tests

**Coverage Not Increasing**
- Add tests for new code
- Review untested branches
- Consider complexity of code
