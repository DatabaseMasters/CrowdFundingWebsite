# CrowdFundingWebsite
Telerik Academy Node.js team project

## Prerequisites

Globally installed 
- eslint, babel-eslint, eslint-config-google
- yarn
- gulp

Installed MongoDB server from [website](https://www.mongodb.com/) (until uploaded to cloud)

Robo 3T (Robomongo) - to browse local db (need to have mongodb server started to connect)

Initial database populate data with `> npm run populate` (need to have mongodb server started first)


## Getting started
| #   | Command                 | Description                |
| --- | ----------------------- | -------------------------- |
| 1.  | `> yarn`                | Restore dependencies       |
| 2.  | `> npm run mong`        | Start local mongodb server |
| 3.  | `> gulp dev`            | Start up dev environment   |
| 4.  | `http://localhost:3001` | Open website               |

MongoDB commands:
- `$ mongod` start connection
- `$ mongo` starts client (for CLI commands)
- `$ show dbs` list databases
- `$ use crowdfunding-db` select database (where 'crowdfunding-db' is a database)
- `$ show collections` list tables
- `$ db.projects.find()` list data (where 'projects' is a collection)
- `$ mongod --shutdown` close connection or Ctrl+C

## To do
Features:
- Breadcrumbs
- User profile page
- Review all comments
- Review all eslint errors

Nadia - about page, contact us
Alex - profile projects list filtering
Milena - express validator, favorites


====================

# Requirements

+ DONE: **public part** (accessible without authentication)
+ DONE: **private part** (available for registered users)

## Technical Requirements

### Application Back-end (Server) - up to 40%

- **5 different public dynamic web pages** - 4 - home , explore , project details, search
- **3 different private (authenticated) dynamic web pages** - 1- user profile page
- **5 different public RESTful routes** for AJAX - 4 - projects list, search,  subscribe
+ DONE: **1 private (authenticated) route** for AJAX - 1- user profile update
+ DONE: **Express** for the server (Use an **MV-*** pattern??)
+ DONE: Use **MongoDB**
+ DONE: Create a data/service layer for accessing the database
+ DONE: Use [Passport](http://passportjs.org/) - for managing **users**
- Implement **WebSockets** (Socket.io or anything else)

### Application front-end (client) - up to 25%

- **Bootstrap** for the front-end
+ DONE: Rresponsive design
- Use at least **one AJAX form and/or WebSockets communication**
- Apply **error handling** and **data validation** to avoid crashes when invalid data is entered
+ DONE: Use loaders, modals and notifications when applicable
- Prevent yourself from **security** holes (XSS, XSRF, Parameter Tampering, etc.) - TODO EXPRESS VALIDATOR
  - Handle correctly the **special HTML characters** and tags like `<script>`, `<br />`, etc.
+ DONE: Create usable UI

### Testing - up to 25%

- Unit test your application backend
  - 50%+ code coverage is required
    - Less will not win the points
- Write functional tests with selenium
  - Any webdriver is Ok
    - Gecko, Chrome, PhantomJS, SlimerJS, etc...
  - Test 50% of the application routes
    - Less will not win the points
- Write integration tests for AJAX routes
  - With supertest

### Deployment in Amazon Web Services (AWS) - up to 10%

- Deploy your application in AWS
- Use MongoDB from AWS

### Bonus requirements - up to 10%

- Setup a continious integration environment
  - Jenkins, CircleCI, or anything else
- Unit testing the client code
- Usage of containers

##  General Requirements

- Use Git
  - Github, Gitlab, Bitbucket, or other
- Brief **documentation** of the project and the project architecture
  - As `README.md` file at the root of the github repository

### Optional Requirements

- Nice looking UI supporting of all modern and old Web browsers
- Record a short video showcasing your application
  - ~1-2 minutes, just show the interesting features
  - Do not record register/login functionality, this is not interesting...

### Deliverables

- Upload your application in the cloud
  - Amazon Web Services
- Register your application at [Our Showcase System](http://best.telerikacademy.com)
  - Link to the live application
  - Link to the video
  - Link to the github repository

### Public Project Defense

Each team will have to make a **public defense** of its work in front of a trainer (for about 30 minutes), in which each of the team members will answer to the trainer's questions individually.

The public defense includes:

- Live **demonstration** of the developed web application (prepare sample data).
- Explain application structure and its back-end and front-end **source code**
- Run the tests
- Show the **commit logs** in the source control repository to prove a contribution from all team members.
- May include a simple task for each team member
  - The task must be implemented immediately

### Give Feedback about Your Teammates

You will be invited to **provide feedback** about all your teammates, their attitude to this project, their technical skills, their team working skills, their contribution to the project, etc.
The feedback is important part of the project evaluation so **take it seriously** and be honest.
