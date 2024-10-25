# Project Management Backend

A Node.js and Express.js backend API for managing projects with role-based access control.

## Features

- **CRUD Operations**: Manage projects, tasks, and users.
- **Role-Based Access**: Admins have full access, while regular users have restricted access.

## Technologies

- **Backend**: Node.js, Express.js
- **Database**: MySql
- **Authentication**: JWT-based authentication

## Getting Started

### Installation

1. Clone the repository:
   git clone https://github.com/rupeshpawar93/projectmanagementbe.git
2. Go to folder: cd projectmanagementbe
3. Install all dependencies: npm install
4. Add .env file to specify
    PORT=3000
    NODE_ENV=production
    DB_HOST=localhost
    DB_PORT=3307
    DB_USERNAME=admin
    DB_PASSWORD=admin
    DB_NAME=projectmgmt
    JWT_SECRET=projectmgmt
5. Run  npm run start command to start node app.
