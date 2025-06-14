# GitHub Project Board Structure for Wall of Regret

This document outlines the recommended GitHub Project Board structure for managing the Wall of Regret project development. The project board should be organized to track individual development tasks completed by each team member.

## Project Board Setup

### Board Name: Wall of Regret Development

### Columns Structure

1. **Backlog**
   - All planned tasks and features
   - User stories and requirements
   - Future enhancements

2. **To Do**
   - Tasks ready to be worked on
   - Assigned to specific team members
   - Prioritized by importance

3. **In Progress**
   - Currently active tasks
   - Limited work-in-progress items
   - Assigned to team members

4. **Review**
   - Completed tasks awaiting code review
   - Pull requests pending approval
   - Testing and validation phase

5. **Done**
   - Completed and approved tasks
   - Merged features
   - Deployed functionality

## Task Categories and Labels

### Labels for Task Organization

- **frontend** - Angular/UI related tasks
- **backend** - NestJS/API related tasks
- **database** - Database schema and operations
- **testing** - Unit tests and integration tests
- **documentation** - Code documentation and guides
- **bug** - Bug fixes and issues
- **enhancement** - New features and improvements
- **setup** - Project configuration and setup

### Priority Labels

- **priority: high** - Critical tasks
- **priority: medium** - Important tasks
- **priority: low** - Nice-to-have tasks

### Team Member Assignment

Each task should be assigned to a specific team member to track individual contributions.

## Sample Project Board Tasks

### Phase 1: Project Setup
- [ ] **Setup NestJS Backend Project** (Assigned: Team Member A)
  - Initialize NestJS application
  - Configure TypeORM with SQLite
  - Set up basic project structure
  - Labels: backend, setup

- [ ] **Setup Angular Frontend Project** (Assigned: Team Member B)
  - Initialize Angular application
  - Configure routing and basic structure
  - Set up development environment
  - Labels: frontend, setup

### Phase 2: Backend Development
- [ ] **Create Regret Entity and Database Schema** (Assigned: Team Member A)
  - Define Regret entity with TypeORM
  - Set up database migrations
  - Configure database connection
  - Labels: backend, database

- [ ] **Implement Regret Service** (Assigned: Team Member C)
  - Create RegretService with CRUD operations
  - Implement business logic
  - Add error handling
  - Labels: backend

- [ ] **Create Regret Controller** (Assigned: Team Member A)
  - Implement REST API endpoints
  - Add input validation with DTOs
  - Configure CORS settings
  - Labels: backend

- [ ] **Add Backend Unit Tests** (Assigned: Team Member C)
  - Write unit tests for RegretService
  - Write unit tests for RegretController
  - Set up test database configuration
  - Labels: backend, testing

### Phase 3: Frontend Development
- [ ] **Create Regret Models and Interfaces** (Assigned: Team Member B)
  - Define TypeScript interfaces
  - Create data models
  - Set up type definitions
  - Labels: frontend

- [ ] **Implement Regret Service (Frontend)** (Assigned: Team Member D)
  - Create Angular service for API communication
  - Implement HTTP client methods
  - Add error handling
  - Labels: frontend

- [ ] **Create Regret List Component** (Assigned: Team Member B)
  - Design and implement regret display
  - Add CRUD operation handlers
  - Implement responsive design
  - Labels: frontend

- [ ] **Create Regret Form Component** (Assigned: Team Member D)
  - Implement reactive forms
  - Add form validation
  - Create reusable form component
  - Labels: frontend

- [ ] **Create Regret Item Component** (Assigned: Team Member B)
  - Design individual regret display
  - Add edit and delete actions
  - Implement date formatting
  - Labels: frontend

- [ ] **Add Frontend Unit Tests** (Assigned: Team Member D)
  - Write component unit tests
  - Write service unit tests
  - Set up testing configuration
  - Labels: frontend, testing

### Phase 4: Documentation and Testing
- [ ] **Add JSDoc Documentation** (Assigned: Team Member C)
  - Document all classes and methods
  - Add comprehensive code comments
  - Generate documentation
  - Labels: documentation

- [ ] **Create Technical Documentation** (Assigned: Team Member A)
  - Write API documentation
  - Create setup and deployment guides
  - Document architecture decisions
  - Labels: documentation

- [ ] **Integration Testing** (Assigned: Team Member D)
  - Test frontend-backend integration
  - Verify API endpoints
  - Test user workflows
  - Labels: testing

### Phase 5: Deployment and Final Testing
- [ ] **Prepare Production Build** (Assigned: Team Member B)
  - Configure production builds
  - Optimize bundle sizes
  - Set up environment configurations
  - Labels: frontend, backend

- [ ] **End-to-End Testing** (Assigned: Team Member C)
  - Test complete user workflows
  - Verify all CRUD operations
  - Test error scenarios
  - Labels: testing

- [ ] **Final Documentation Review** (Assigned: All Team Members)
  - Review all documentation
  - Update README files
  - Prepare presentation materials
  - Labels: documentation

## Task Management Best Practices

### Task Creation Guidelines
1. **Small, Focused Tasks**: Each task should be completable by one person in 1-4 hours
2. **Clear Descriptions**: Include acceptance criteria and implementation details
3. **Proper Assignment**: Assign tasks to specific team members
4. **Appropriate Labels**: Use consistent labeling for easy filtering

### Progress Tracking
1. **Daily Updates**: Team members should update task status daily
2. **Blockers**: Mark tasks that are blocked and identify dependencies
3. **Time Tracking**: Estimate and track time spent on each task
4. **Regular Reviews**: Conduct weekly reviews of board progress

### Code Review Process
1. **Pull Request Creation**: Create PR when moving task to "Review"
2. **Peer Review**: At least one other team member must review
3. **Testing**: Ensure all tests pass before approval
4. **Documentation**: Verify documentation is updated

## GitHub Repository Structure

### Recommended Repository Setup
- **Single Repository**: Use one repository for both frontend and backend
- **Branch Strategy**: Use feature branches for each task
- **Commit Messages**: Follow conventional commit format
- **Pull Requests**: Link PRs to project board tasks

### Branch Naming Convention
- `feature/task-description` - For new features
- `bugfix/issue-description` - For bug fixes
- `docs/documentation-update` - For documentation changes

### Example Branch Names
- `feature/backend-regret-entity`
- `feature/frontend-regret-form`
- `bugfix/validation-error-handling`
- `docs/api-documentation`

## Meeting Schedule and Reviews

### Weekly Team Meetings
- **Sprint Planning**: Plan tasks for the upcoming week
- **Progress Review**: Review completed tasks and blockers
- **Code Review**: Discuss code quality and improvements
- **Documentation**: Ensure all work is properly documented

### Individual Presentations
Each team member should be prepared to present:
1. **Tasks Completed**: Demonstrate implemented features
2. **Code Quality**: Explain design decisions and implementation
3. **Challenges Faced**: Discuss problems and solutions
4. **Testing**: Show test coverage and validation

This project board structure ensures that every team member has clear, trackable tasks and that the development process is well-documented and organized according to the course requirements.

