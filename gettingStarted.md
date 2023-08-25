# Invoice-MERN-CRUD-Demo

## Overview

This project serves as a comprehensive example of a full-stack CRUD (Create, Read, Update, Delete) application using the MERN stack, AG Grid, and the ExchangeRate-API.

## Technologies Used

- **MERN Stack**: MongoDB, Express, React, and Node.js
- **Mongoose**: For object modeling and schema validation with MongoDB
- **AG Grid**: For advanced data grid capabilities (Server-Side Row Model)
- **ExchangeRate-API**: For currency conversion
- **TypeScript**: For strong typing and better code maintainability
- **Bootstrap, SASS, CSS modules**: For UI styling
- **Jest & Enzyme**: For testing

## Prerequisites

Before you begin, make sure you have the following:

- MongoDB database access
- API key for ExchangeRate-API.com (Free tier available)

## Getting Started

### Setting up Environment Variables

You'll need to set the following environment variables:

- **Project Root Directory**:

  - `NODE_ENV`
  - `PORT`
  - `MONGODB_URI`

- **Frontend Directory**:
  - `REACT_APP_EXCHANGE_RATE_API_KEY`

### Installing Dependencies

To download all the necessary packages, run the following commands:

In the project root directory:

```bash
$ npm install
```

In the frontend directory:

```bash
$ npm run client-install
```

### Connect to MongoDB

Use MongoDB Compass to connect to your database.

### Running the Development Server

To start the development server, execute the following command:

```bash
$ npm run dev
```

## Running Tests

- Backend Tests: `$ npm run test`
- Frontend Tests: Navigate to the frontend directory and then `$ npm run test`
