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


AWS: 
http://ec2-18-220-86-168.us-east-2.compute.amazonaws.com

Instructions to create projects:
- YouTube video needs to be an embed link
- If validation error, need select the cover image again.

## Getting started
| #   | Command                 | Description                |
| --- | ----------------------- | -------------------------- |
| 1.  | `> yarn`                | Restore dependencies       |
| 2.  | `> npm run mong`        | Start local mongodb server |
| 3.  | `> gulp dev`            | Start up dev environment   |
| 4.  | `http://localhost:3001` | Open website               |

## MongoDB commands:
- `$ mongod` start connection
- `$ mongo` starts client (for CLI commands)
- `$ show dbs` list databases
- `$ use crowdfunding-db` select database (where 'crowdfunding-db' is a database)
- `$ show collections` list tables
- `$ db.projects.find()` list data (where 'projects' is a collection)
- `$ mongod --shutdown` close connection or Ctrl+C

## Testing:
- `npm test` - runs mocha tests
- `npm run test-istanbul` - runs mocha tests with istanbul coverage only counting files which have tests

**Gulp reports**:
- **`gulp tests-all`** - runs integration and unit tests with coverage of all relevant js files (mocha, istanbul)
- `gulp tests-unit` - runs unit tests
- `gulp tests-integration` - runs integration tests


## To do
Features:
- Breadcrumbs
- User profile page
- Comments on project page?
- Review all comments
- Review all eslint errors

- Nadia - about page, contact us
- Alex - profile projects list filtering
- Milena - express validator, favorites


====================

# Requirements

+ DONE: **public part** (accessible without authentication)
+ DONE: **private part** (available for registered users)

## Technical Requirements

### Application Back-end (Server) - up to 40%

- **Public dynamic web pages** - 4/5 - home , explore , project details, search
- **Pprivate (authenticated) dynamic web pages** - 1/3- user profile page
+ DONE: **Public RESTful routes** for AJAX - 6/5 - projects list, search,  subscribe, contact, donate
+ DONE: **Private (authenticated) route** for AJAX - 1/1- user profile update
+ DONE: **Express** for the server (Use an **MV-*** pattern??)
+ DONE: Use **MongoDB**
+ DONE: Create a data/service layer for accessing the database
+ DONE: Use [Passport](http://passportjs.org/) - for managing **users**
- Implement **WebSockets** (Socket.io or anything else)

### Application front-end (client) - up to 25%

- **Bootstrap** for the front-end
+ DONE: Rresponsive design
- Use at least **one AJAX form and/or WebSockets communication**
- DONE?? **Error handling** and **data validation** to avoid crashes when invalid data is entered - client side HTML5 validation, server side validation, error handling with flash messages (??)
+ DONE: Use loaders, modals and notifications when applicable
- PARTIAL: Prevent yourself from **security** holes (XSS, XSRF, Parameter Tampering, etc.) - client side js to prevent code injection, TODO EXPRESS VALIDATOR,
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

- DONE: Used Git
- PARTIAL: Brief **documentation** of the project and the project architecture as `README.md` file at the root of the github repository

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

The public defence includes:

- Live **demonstration** of the developed web application (prepare sample data).
- Explain application structure and its back-end and front-end **source code**
- Run the tests
- Show the **commit logs** in the source control repository to prove a contribution from all team members.
- May include a simple task for each team member
  - The task must be implemented immediately
