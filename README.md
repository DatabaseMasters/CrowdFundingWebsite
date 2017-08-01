# CrowdFundingWebsite by team Vencedores
Telerik Academy Node.js team project

## Description
The application is a crowdfunding web page for social projects. Functionalities: user registration, creating projects, adding and removing favorite projects from search results, donation to projects, search, uploading image files, linking youtube videos.


## Project Members

| Team member         | Email                       | Username      |    Tasks                        |
| ------------        | -------                     | :------:      | -------------------------       |
| Aleksandar Ikonomov | aleksandar.ikonomov@abv.bg  | a.ikonomov    | User profile page, authentication, UT                   |
| Milena Sapunova     | milena.sapunova@gmail.com       | milena.aleksandrova   | Project page, file uploads, Selenium  |
| Nadezhda Hristova   | epohster@gmail.com          | nhristova     | Home, explore page, feedback, UT     |


## Links
- [AWS](http://ec2-18-220-86-168.us-east-2.compute.amazonaws.com)
- [GitHub Team Vencedores](https://github.com/TeamVencedores/CrowdFundingWebsite)

## Prerequisites for local launch

Globally installed 
- eslint, babel-eslint, eslint-config-google
- yarn
- gulp

Installed MongoDB server from [website](https://www.mongodb.com/) (until uploaded to cloud)

Robo 3T (Robomongo) - to browse local db (need to have mongodb server started to connect)

Initial database populate data with `> npm run populate` (need to have mongodb server started first)


## Instructions to create projects:
- YouTube video needs to be an embed link format
- If validation error, need select the cover image again.

## Getting started
| #   | Command                 | Description                |
| --- | ----------------------- | -------------------------- |
| 1.  | `> yarn`                | Restore dependencies       |
| 2.  | `> npm run mong`        | Start local mongodb server |
| 3.  | `> gulp dev`            | Start up dev environment   |
| 4.  | `http://localhost:3001` | Open website               |

## Testing:
- `npm test` - runs mocha tests
- `npm run test-istanbul` - runs mocha tests with istanbul coverage only counting files which have tests

**Gulp reports**:
- **`gulp tests-all`** - runs integration and unit tests with coverage of all relevant js files (mocha, istanbul)
- `gulp tests-unit` - runs unit tests
- `gulp tests-integration` - runs integration tests

# Requirements

+ DONE: **public part** (accessible without authentication)
+ DONE: **private part** (available for registered users)

## Technical Requirements

### Application Back-end (Server) - up to 40%

- **Public dynamic web pages** - 4/5 - home , explore , project details, search
- **Pprivate (authenticated) dynamic web pages** - 1/3- user profile page
+ DONE: **Public RESTful routes** for AJAX - 6/5 - projects list, search,  subscribe, contact, donate
+ DONE: **Private (authenticated) route** for AJAX - 1/1- user profile update
+ DONE: **Express** for the server (Use an **MV-*** pattern)
+ DONE: Use **MongoDB**
+ DONE: Create a data/service layer for accessing the database
+ DONE: Use [Passport](http://passportjs.org/) - for managing **users**
- NOT DONE: Implement **WebSockets** (Socket.io or anything else)

### Application front-end (client) - up to 25%

- **Bootstrap** for the front-end
+ DONE: Rresponsive design
- NOT DONE: Use at least **one AJAX form and/or WebSockets communication**
- DONE: **Error handling** and **data validation** to avoid crashes when invalid data is entered - client side HTML5 validation, server side validation, error handling with flash messages (??)
+ DONE: Use loaders, modals and notifications when applicable
- PARTIAL: Prevent yourself from **security** holes (XSS, XSRF, Parameter Tampering, etc.) - client side js to prevent code injection
  - Handle correctly the **special HTML characters** and tags like `<script>`, `<br />`, etc.
+ DONE: Create usable UI

### Testing - up to 25%

- DONE: Unit test your application backend
- DONE: Write functional tests with selenium
- PARTIAL: Write integration tests for AJAX routes with supertest

### Deployment in Amazon Web Services (AWS) - up to 10%

- DONE: Deploy your application in AWS
- DONE: Use MongoDB from AWS

### Bonus requirements - up to 10% - NOT DONE

- Setup a continious integration environment
  - Jenkins, CircleCI, or anything else
- Unit testing the client code
- Usage of containers

##  General Requirements

- DONE: Used Git
- DONE: Brief **documentation** of the project and the project architecture as `README.md` file at the root of the github repository

### Optional Requirements

- DONE: Nice looking UI supporting of all modern and old Web browsers
- DONE: Record a short video showcasing your application
  - ~1-2 minutes, just show the interesting features
  - Do not record register/login functionality, this is not interesting...

### Deliverables

- DONE: Upload your application in the cloud - Amazon Web Services
- DONE: Register your application at [Our Showcase System](http://best.telerikacademy.com)
  - Link to the live application
  - Link to the video
  - Link to the github repository

