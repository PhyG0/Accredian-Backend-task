# Accerdian Refer and Earn - Backend

This is the backend for Accerdian's Refer and Earn system, implementing user authentication, referral link generation, and referral processing.

## Technologies Used

- Node.js
- Express.js
- MySQL
- Prisma ORM

## Features

- User Authentication (Sign Up, Sign In)
- Referral Link Generation
- Referral Processing
- Email Sending for Referrals

## API Endpoints

### Authentication

- `POST /api/auth/signup`: Create a new user account
- `POST /api/auth/signin`: Authenticate a user and return a token
- `POST /api/auth/signin?referrelLink=referreCode: Create a new user using referrel


## Database Schema

The database schema is managed using Prisma. Key models include:

- User
- Referral
- ReferralLink


## Setup and Installation

1. Clone the repository
2. Install dependencies
3. Set up your MySQL database and update the `.env` file with your database credentials.
4. Run Prisma migrations
5. Start the server

## Environment Variables
Create a `.env` file in the root directory using the given .env.example file

