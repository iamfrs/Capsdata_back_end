

# CapsData Backend

This is the backend code for CapsData, developed with Node.js and TypeScript.

Project Structure
----------------
Controllers: app/controller

Contains all the logic for handling HTTP requests.
Routes: app/routes

Contains route definitions and maps them to corresponding controllers.
Database Schema: src/entity
Contains TypeORM entities and database schema definitions.

Third-party Functions
---------------------

We use utility functions from "node custom utils" (our custom library) for various tasks.

Development Setup
--------------------
Install Dependencies
`npm install`

Build the Project
--------------------
`npm run build`
This command compiles the TypeScript code into JavaScript.

Run the Project
--------------------
`npm run js`
This command runs the compiled JavaScript code.

