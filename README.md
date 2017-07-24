# CrowdFundingWebsite
Telerik Academy Node.js team project

## Prerequisites

Globally installed 
- eslint, babel-eslint, eslint-config-google
- yarn
- gulp

Installed MongoDB server from [website](https://www.mongodb.com/) (until uploaded to cloud)


## Getting started
| #   | Command                 | Description                |
| --- | ----------------------- | -------------------------- |
| 1.  | `> yarn`                | Restore dependencies       |
| 2.  | `> npm run mong`        | Start local mongodb server |
| 3.  | `> gulp dev`            | Start up dev environment   |
| 4.  | `http://localhost:3001` | Open website               |

MongoDB commands:
- `$ mongod` starts server
- `$ mongo` starts client (for CLI commands)
- `$ show dbs` list databases
- `$ use items-db` select database (where 'items-db' is a database)
- `$ show collections` list tables
- `$ db.items.find()` list data (where 'items' is a collection)

## To do
Features:
- Breadcrumbs

Fixes:
- Dropdown on hover doesn't work when on explore page

Tweaks:
- Rename items to projects
