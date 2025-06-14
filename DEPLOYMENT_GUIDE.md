# Wall of Regret - Deployment Guide

This guide provides step-by-step instructions for deploying the Wall of Regret application in different environments.

## Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)
- Git

## Development Environment Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd wall-of-regret
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

The backend will be available at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend
npm install
ng serve --host 0.0.0.0 --port 4200
```

The frontend will be available at `http://localhost:4200`

## Production Deployment

### Backend Production Build

1. **Build the application:**
```bash
cd backend
npm run build
```

2. **Start the production server:**
```bash
npm run start:prod
```

### Frontend Production Build

1. **Build the application:**
```bash
cd frontend
ng build --configuration production
```

2. **Serve the built files:**
The built files will be in `frontend/dist/frontend/` directory. Serve these files using a web server like nginx or Apache.

## Docker Deployment (Optional)

### Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
```

### Docker Compose

Create `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./backend/wall-of-regret.db:/app/wall-of-regret.db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

Run with:
```bash
docker-compose up -d
```

## Environment Configuration

### Backend Environment Variables

Create `backend/.env` file:

```env
NODE_ENV=production
PORT=3000
DATABASE_PATH=./wall-of-regret.db
CORS_ORIGIN=http://localhost:4200
```

### Frontend Environment Configuration

Update `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'http://your-backend-domain.com'
};
```

## Database Setup

### Development
The application uses SQLite by default, which requires no additional setup.

### Production
For production, consider using a more robust database:

1. **PostgreSQL Setup:**
```bash
npm install pg @types/pg
```

Update `backend/src/app.module.ts`:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Regret],
  synchronize: false, // Use migrations in production
}),
```

## Web Server Configuration

### Nginx Configuration

Create `/etc/nginx/sites-available/wall-of-regret`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/frontend/dist/frontend;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/wall-of-regret /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Process Management

### Using PM2 for Backend

1. **Install PM2:**
```bash
npm install -g pm2
```

2. **Create ecosystem file** `backend/ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'wall-of-regret-backend',
    script: 'dist/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

3. **Start the application:**
```bash
cd backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## SSL/HTTPS Setup

### Using Certbot with Nginx

1. **Install Certbot:**
```bash
sudo apt install certbot python3-certbot-nginx
```

2. **Obtain SSL certificate:**
```bash
sudo certbot --nginx -d your-domain.com
```

3. **Auto-renewal:**
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logging

### Backend Logging

The application uses NestJS built-in logging. For production, consider using a logging service like Winston:

```bash
npm install winston nest-winston
```

### Health Checks

Add health check endpoint in `backend/src/app.controller.ts`:

```typescript
@Get('health')
getHealth(): object {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
}
```

## Backup Strategy

### Database Backup

For SQLite:
```bash
# Create backup
cp wall-of-regret.db wall-of-regret-backup-$(date +%Y%m%d).db

# Automated backup script
#!/bin/bash
BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d_%H%M%S)
cp wall-of-regret.db "$BACKUP_DIR/wall-of-regret-$DATE.db"

# Keep only last 7 days of backups
find "$BACKUP_DIR" -name "wall-of-regret-*.db" -mtime +7 -delete
```

### Code Backup

Ensure your code is backed up to a Git repository:
```bash
git remote add origin <your-repository-url>
git push -u origin master
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
```bash
# Find process using port
sudo lsof -i :3000
# Kill process
sudo kill -9 <PID>
```

2. **Permission denied:**
```bash
# Fix file permissions
chmod +x start-script.sh
```

3. **Database connection issues:**
- Check database credentials
- Verify database server is running
- Check firewall settings

4. **CORS errors:**
- Verify CORS configuration in backend
- Check frontend API URL configuration

### Logs Location

- **Backend logs:** Check PM2 logs with `pm2 logs`
- **Nginx logs:** `/var/log/nginx/access.log` and `/var/log/nginx/error.log`
- **System logs:** `journalctl -u your-service-name`

## Performance Optimization

### Frontend Optimization

1. **Enable gzip compression in nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

2. **Enable caching:**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Backend Optimization

1. **Enable compression:**
```bash
npm install compression
```

Add to `main.ts`:
```typescript
import * as compression from 'compression';
app.use(compression());
```

2. **Database indexing:**
Add indexes to frequently queried fields in your database.

## Security Considerations

1. **Environment Variables:** Never commit sensitive data to version control
2. **HTTPS:** Always use HTTPS in production
3. **Input Validation:** Ensure all inputs are validated
4. **Rate Limiting:** Implement rate limiting to prevent abuse
5. **Security Headers:** Add security headers using helmet

```bash
npm install helmet
```

```typescript
import * as helmet from 'helmet';
app.use(helmet());
```

This deployment guide covers the essential steps for deploying the Wall of Regret application in various environments. Adjust the configurations based on your specific requirements and infrastructure.

