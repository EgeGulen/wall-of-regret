# Wall of Regret Application

This project is a CRUD (Create, Read, Update, Delete) application named "Wall of Regret", developed using an Angular frontend and a NestJS backend. It is designed to allow users to post and manage their regrets anonymously or with their name.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm (Node Package Manager)

### Setup and Run
```bash
# Clone the repository
git clone <repository-url>
cd wall-of-regret

# Setup development environment
./setup.sh

# Start both servers
./start-dev.sh
```

The application will be available at:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000

## 📁 Project Structure

```
wall-of-regret/
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── regret.entity.ts    # Database entity
│   │   ├── regret.service.ts   # Business logic
│   │   ├── regret.controller.ts # API endpoints
│   │   ├── regret.dto.ts       # Data validation
│   │   └── regret.module.ts    # Module configuration
│   └── package.json
├── frontend/                # Angular frontend application
│   ├── src/app/
│   │   ├── components/         # Angular components
│   │   ├── services/          # API services
│   │   └── models/            # TypeScript interfaces
│   └── package.json
├── TECHNICAL_DOCUMENTATION.md  # Comprehensive technical docs
├── DEPLOYMENT_GUIDE.md        # Deployment instructions
├── GITHUB_PROJECT_BOARD.md    # Project management guide
└── README.md                  # This file
```

## 🛠 Technology Stack

**Frontend:**
- Angular 19
- TypeScript
- Reactive Forms
- CSS

**Backend:**
- NestJS
- TypeORM
- SQLite
- Class-validator

## 📋 Features

- ✅ Create new regrets (anonymous or with name)
- ✅ View all regrets in chronological order
- ✅ Edit existing regrets
- ✅ Delete regrets
- ✅ Responsive design for mobile and desktop
- ✅ Input validation and error handling
- ✅ Real-time character count
- ✅ Comprehensive unit tests

## 🧪 Testing

Run the test suite:
```bash
./run-tests.sh
```

**Test Coverage:**
- Frontend: 24 unit tests (23 passing)
- Backend: API endpoints tested manually
- All components and services have unit tests

## 📖 API Documentation

### Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/regrets` | Get all regrets |
| GET | `/regrets/:id` | Get specific regret |
| POST | `/regrets` | Create new regret |
| PATCH | `/regrets/:id` | Update regret |
| DELETE | `/regrets/:id` | Delete regret |

### Example API Usage

```bash
# Get all regrets
curl http://localhost:3000/regrets

# Create a new regret
curl -X POST http://localhost:3000/regrets \
  -H "Content-Type: application/json" \
  -d '{"content": "I regret not starting this project earlier", "author": "John"}'
```

## 🔧 Development

### Manual Setup
If you prefer manual setup:

**Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
ng serve
```

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
ng build --configuration production
```

## 📚 Documentation

- **[Technical Documentation](TECHNICAL_DOCUMENTATION.md)** - Comprehensive technical details
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[Project Board Guide](GITHUB_PROJECT_BOARD.md)** - Team collaboration and task management

## 🎯 Project Requirements Compliance

This project fulfills all course requirements:

✅ **CRUD Application**: Full Create, Read, Update, Delete functionality  
✅ **Angular + NestJS Stack**: Modern full-stack implementation  
✅ **GitHub Project Board**: Detailed task management structure  
✅ **Version Control**: Proper Git history with meaningful commits  
✅ **Code Documentation**: Comprehensive JSDoc documentation  
✅ **Unit Testing**: Extensive test coverage for Angular components  
✅ **Team Collaboration**: Individual task assignments and contribution tracking  

## 👥 Team Collaboration

The project is designed for team development with:
- Individual task assignments tracked via GitHub Project Board
- Clear separation of frontend/backend responsibilities
- Comprehensive documentation for knowledge sharing
- Unit tests to ensure code quality
- Git workflow with feature branches and pull requests

## 🚀 Deployment

For production deployment, see the [Deployment Guide](DEPLOYMENT_GUIDE.md) which covers:
- Docker containerization
- Nginx configuration
- SSL/HTTPS setup
- Database migration to PostgreSQL
- Process management with PM2
- Monitoring and logging

## 🤝 Contributing

1. Create a feature branch from `master`
2. Make your changes with proper documentation
3. Add unit tests for new functionality
4. Create a pull request with detailed description
5. Ensure all tests pass before merging

## 📄 License

This project is developed for educational purposes as part of a university course.

## 📞 Support

For questions or issues:
1. Check the [Technical Documentation](TECHNICAL_DOCUMENTATION.md)
2. Review the [Deployment Guide](DEPLOYMENT_GUIDE.md)
3. Contact the development team

---

**Wall of Regret** - A place to share and reflect on life's regrets, built with modern web technologies.

