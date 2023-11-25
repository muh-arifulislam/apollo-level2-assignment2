#####live-hosting: <https://apollo-level2-assignment2.vercel.app/>

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- create .env file in root directory. with the given variable.
  ```env
    PORT= 5000
    DB_URL= //your_database_url
  ```
- `npm run dev` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [zod](https://github.com/Automattic/mongoose) - For schema validation
- [cors](https://github.com/Automattic/mongoose) - For handling cross origin request
- [dotenv](https://github.com/Automattic/mongoose) - To secure environment variable
- [bcrypt](https://github.com/Automattic/mongoose) - To store password in hashed format

## Application Structure

- `app.js` - This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose.
- `config/` - This folder contains configuration for configuration/environment variables.
- `modules/` - This folder contains the schema definitions for our Mongoose models.

## Routes

### Create a new user

- **Endpoint:** `POST /`
- **Description:** Creates a new user.

### Retrieve all users data

- **Endpoint:** `GET /`
- **Description:** Retrieves all users data.

### Retrieve a specific user data by user id

- **Endpoint:** `GET /:userId`
- **Description:** Retrieves data of a specific user using user id.

### Update a user by user id

- **Endpoint:** `PUT /:userId`
- **Description:** Updates information for a user using user id.

### Delete a user by user id

- **Endpoint:** `DELETE /:userId`
- **Description:** Deletes a user using user id.

### Add an order for a specific user

- **Endpoint:** `POST /:userId/orders`
- **Description:** Adds an order for a specific user.

### Retrieve all orders data for a specific user

- **Endpoint:** `GET /:userId/orders`
- **Description:** Retrieves all orders of a specific user.

### Retrieve the total price of all orders of a specific user

- **Endpoint:** `GET /:userId/orders/total-price`
- **Description:** Retrieves the total price of all orders of a specific user.
