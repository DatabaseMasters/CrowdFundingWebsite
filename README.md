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

Fixes:
- Dropdown on hover doesn't work when on explore page

Tweaks:
- Rename items to projects
