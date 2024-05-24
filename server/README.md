# Library Management System Server (Node.js, Express, PostgreSQL)

This is the server portion of the Library Management System example application.


## Getting Started
This project will require a PostgreSQL database to run and Node.js 18 or higher. 

Steps to run this project:
1. Run `npm i` command
2. Setup database settings inside `.env` file
3. Run `npm run seed` to create and seed the database
4. Run `npm start` command


## Current Endpoints

| Type | URL          | Description |
| ---- | ------------ | ----------- |
| GET  | /auth/logout | User logout |
| POST | /auth/login  | User login |
| GET  | /api/users   | Get all users |
