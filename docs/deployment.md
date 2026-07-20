# Deployment

## Environment Setup

### Prerequisites
- Node.js (v16+) / Python (v3.9+) / Java (v11+)
- npm / pip / maven package manager
- Docker (optional but recommended)
- PostgreSQL / MySQL database server

### Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@localhost:5432/gatepass
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=3600
API_PORT=3000
API_HOST=0.0.0.0
ADMIN_EMAIL=admin@example.com
LOG_LEVEL=info
```

## Deployment Options

### Option 1: Docker

```bash
docker build -t gatepass:latest .
docker run -p 3000:3000 --env-file .env gatepass:latest
```

### Option 2: Traditional Server

1. Install dependencies: `npm install` / `pip install -r requirements.txt`
2. Build application: `npm run build`
3. Start server: `npm start` / `python app.py`

### Option 3: Cloud Platforms

#### Heroku
```bash
heroku login
heroku create gatepass-app
heroku config:set DATABASE_URL=...
git push heroku main
```

#### AWS (Elastic Beanstalk, Lambda, EC2)
- Configure AWS credentials
- Deploy using AWS CLI or console
- Set up RDS for database

#### Google Cloud / Azure
- Follow respective platform documentation
- Configure managed database services

## Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL/TLS certificates configured
- [ ] Logging aggregation set up
- [ ] Monitoring and alerts configured
- [ ] Backup system operational
- [ ] Auto-scaling configured (if applicable)
- [ ] Security audit completed

## Scaling Considerations

- Horizontal scaling with load balancer
- Database read replicas
- Caching layer (Redis)
- CDN for static assets

## Rollback Plan

- Keep previous version deployed
- Database migration rollback scripts
- Quick reversal procedure documented

## Monitoring

- Application health checks
- Error tracking (Sentry, etc.)
- Performance monitoring (New Relic, DataDog)
- Log aggregation (ELK stack, Splunk)

## CI/CD Pipeline

Automated deployment via GitHub Actions / GitLab CI / Jenkins:
1. Run tests
2. Build application
3. Push to registry
4. Deploy to staging
5. Run integration tests
6. Deploy to production
