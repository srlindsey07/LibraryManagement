# Library Management System Server (Node.js, Express, PostgreSQL)

This project is intended to showcase my knowledge in different areas as well as give me a space to expand my knowledge. This is not a complete application, as I will be gradually adding to it.

Technology
-   Express
-   Node.js 
-   Jest
-   TypeScript
-   PostgreSQL
-   Typeorm
-   JWT

Skills Features
-   Full stack development
-   REST API design/creation
-   Authentication
-   User permissions
-   JWT
-   Relational database (PostgreSQL) connection and use


## Getting Started
This project will require a PostgreSQL database to run and Node.js 18 or higher. 

Steps to run this project:
1. Run `npm i` command
2. Setup database settings inside `.env` file
3. Run `npm run seed` to create and seed the database
4. Run `npm start` command


## Features
This project will include several features.

-   Login/Logout (In progress)
-   Authorization (In progress)
-   Book search by title or author (To do)
-   User profiles containing contact information and borrower issued/returned book history (To do)
-   Issue/Return book system (To do)


### Permissions
There are 3 types of users. In order of least amount of privileges to the greatest, the roles are "Anonymous", "Borrower", "Librarian" and "Admin."

#### Anonymous
-   Search for books

#### Borrower
-   All public permissions
-   View/Update their profile
-   View issued books

#### Librarian
-   All Borrower permissions
-   View/Add/Update books
-   VIew/Add/Update borrowers
-   Issue/Check In books

#### Admin
-   All Librarian permissions
-   Delete books
-   Add/Update/Delete Admins and Librarians

#### Test Users

| Access Level | Email              | Password  |
| ------------ | ------------------ | --------- |
| Admin        | admin@test.com     | Admin     |
| Librarian    | librarian@test.com | Librarian |
| Borrower     | borrower@test.com  | Borrower  |
