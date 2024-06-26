[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/gtp0On7_)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15019676&assignment_repo_type=AssignmentRepo)

# TechnologieChmuroweTemplate

# Project Overview

This project is developed as part of the Cloud Technologies course at the University of Gdańsk, specifically tailored for students pursuing a practical profile in computer science. It aims to address a specific need or problem statement, often originating from a real-world scenario where a company or individual requires a robust database system.

## Architecture Description

The project is structured into two main components: the client-side and the server-side, facilitating a full-stack development environment.

- **Client-side**: Built with [Next.js](https://nextjs.org/), the client-side of the application offers a dynamic and responsive user interface. It is designed to interact seamlessly with the server-side, providing an intuitive user experience.

- **Server-side**: The server-side is developed using Node.js, with a focus on handling API requests, authentication, and database interactions. It employs Prisma as an ORM for database management, ensuring efficient data handling and migrations.

## Key Features

- **Authentication**: Utilizes Keycloak for robust authentication and authorization, ensuring secure access to the application.
- **Database Management**: Incorporates Prisma for database schema definition, migrations, and query building, facilitating smooth data operations.
- **Responsive UI**: The client-side is designed with responsiveness in mind, ensuring compatibility across various devices and screen sizes.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the `backend` directory and run `npm install` to install server-side dependencies and then run `npm start`.
3. Similarly, navigate to the `client` directory and run `npm install` for client-side dependencies and then run `npm run dev`.
4. Set up your `.env` files in both `backend` and `client` directories according to the provided templates.
5. Run `docker-compose up` to start the keycloak and database containers.
6. Access application at `localhost:3000`

## client/.env.local

KEYCLOAK_CLIENT_ID=`your_client_id`
KEYCLOAK_CLIENT_SECRET=`your_client_secret`
KEYCLOAK_ISSUER="http://localhost:8080/realms/nextRealm"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=`nextauth_secret`
NEXT_PUBLIC_API_URL="http://localhost:3001"

## server/.env

DATABASE_URL="postgresql://`login`:`password`@localhost:5432/next"
S3_ACCESS_KEY=`s3_access_key`
S3_SECRET_ACCESS_KEY=`s3_secret_access_key`
