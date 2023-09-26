# Chat App
* This project aims to implement a chat app to chat with multiple users .

* Views: login, chat page
   - Roles: user
## Table of Contents:

* 1 Built
* 2 Getting Started
* 3 APIs
* 4 Form Validations
* 5 Image

## 1. Built
* Express.js: an express server.js to host RESTFUL services and act as a static file server
* React: a create-react-app-based SPA build as static files that uses those services

## 2. Getting Started
2.1 Setup
* Run npm install

2.2 Running for development

* Start the express server: in a terminal,
* for windows users, run "npm run start-win"
* for other users, run "npm start"
* Start the development CRA server:
* in a different terminal, run "npm run dev"
* Lunch localhost on port 3000:
* http://localhost:3000, the development server port

2.3 Running for production

Create the static files:
* in a terminal, run "npm run build" to create the static files in the build/ directory
* start the express server:
* in a terminal,
* For windows users, run "npm run start-win"
* For other users, run "npm start"
* Visit localhost on port 4000:
* http://localhost:4000, the express server port

## 3. APIs

3.1 sessions

* Method	URL
* GET	/api/session -  get current logged-in user-session
* POST	/api/session -  create new session
* DELETE	/api/session -  delete user session

3.2 users

* GET	/api/users  get current online users

3.3 messages

* GET    /api/messages -   Fetch chat messages
* POST   /api/messages	- add message to chat and fetch updated messages

## 4. Form Validation

4.1 LoginForm
* Client-side 
   - blank username validation

* Server side 
   - auth-missing- Authentication validation
   - required-username- Username missing,username has special charecters validation
   - auth-insufficient- Username 'dog' not allowed
   - username-length- Username length should be less than 20 charecters validation- invalid


4.2 ChatMessages
* Client-side
    - blank user message validation

* Server-side
   - required-message- message should not be empty validation

## 5. Image

Image for Login page is taken from https://unsplash.com/

- https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&dl=yerlin-matu-GtwiBmtJvaU-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb
