# taskEase: Simplifying Your Daily Agenda

taskEase application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This app allows users to manage their tasks effectively.

![taskEase App Screenshot](https://i.imgur.com/tsx2NAq.png)

## Features

- User Registration: Register with a username and password.
- User Authentication: Log in securely with your credentials.
- Create taskEases: Add tasks with titles, descriptions, due dates, and priorities.
- Update taskEases: Edit task titles and priorities.
- Delete taskEases: Remove tasks you no longer need.
- Mark as Completed: Toggle task completion status.
- Filters: Filter tasks by priority and completion status.
- Sort by Due Date: Arrange tasks based on their due dates for better organization.
- Custom Notification: Receive real-time notifications for successful and failed actions.


## Technologies Used

- **Frontend:** React.js, React Router,
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS (Custom Styles)

## Installation and Setup

1. Clone the repository: `git clone https://github.com/prabhatkr007/taskEase.git`
2. Navigate to the project directory: `cd taskEase`
3. Navigate to the server directory: `cd server`
4. Install server dependencies: `npm install`
5. Create a `config.env` file in the root directory of the server.
6. Inside the `config.env` file, add the following environment variables:

```
# MongoDB Connection URI
DATABASE=your_mongodb_connection_uri

# JWT Secret Key (for user authentication)
SECRET_KEY=your_jwt_secret_key

# Other Configuration Variables
PORT=4000
```

7. Start the development server: `npm start`
8. Go back to the project directory: `cd ..`
9. Navigate to the client directory: `cd client`
10. Install client dependencies: `npm install`
11. Start the client: `npm start`

Make sure you have Node.js and MongoDB installed on your machine.

## Authentication Flow

### User Registration:

1. Users can register by providing a username and password.
2. The backend validates the data, hashes the password, and stores it in the database.

### User Login:

1. Registered users can log in with their username and password.
2. The backend validates the credentials, creates a session, and returns an authentication token 

### Session Management:

1. Sessions are managed using secure HTTP cookies or tokens.
2. Users remain logged in until they log out or the session expires.

## Security Measures


- User passwords are securely hashed before storage to protect user data.



- Sessions are managed securely, and sensitive data is stored in HTTP-only cookies.



- Middleware is used for authentication and authorization to protect routes and endpoints.


- Sensitive information like database credentials and session secrets is stored in environment variables.


- Robust error handling is implemented to handle unexpected issues gracefully.
