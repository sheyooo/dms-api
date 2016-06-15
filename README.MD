###### Code Quality: [![Code Climate](https://codeclimate.com/github/sheyooo/dms-api/badges/gpa.svg)](https://codeclimate.com/github/sheyooo/dms-api)  Test Coverage: [![Test Coverage](https://codeclimate.com/github/sheyooo/dms-api/badges/coverage.svg)](https://codeclimate.com/github/sheyooo/dms-api/coverage)  Build Status: [![Build Status](https://travis-ci.org/sheyooo/dms-api.svg?branch=master)](https://travis-ci.org/sheyooo/dms-api)

DOCUMENT MANAGEMENT SYSTEM
==========================

Document Management System is an application that helps users manage their documents in an organized way. A User can be able to upload a document, edit it and share it with other users. Aside from enabling users to properly document their work with regard to category, the application permits users to work collaboratively on documents.

Development
-----------
This application has been created using Nodejs environment and implementing [**Express**](http://expressjs.com/) as the routing framework and [**Mongoose**](http://mongoosejs.com/), an object modeling package, to interact with MongoDB. Authentication has been implemented using [**Passport**](http://passportjs.org/). For this version, only local strategy has been used. [**JWT tokens**](https://jwt.io/) have also been used to authenticate routes.

Installation.
-------------
1. Install [**Nodejs**](www.nodejs.org) and [**MongoDB**](www.mongodb.org)
2. Clone this repo or download the zipped file.
3. Navigate to the master branch.
4. Run
    ```
    npm install

    ```
    This will install the required dependencies.
5. Run
    ```
    npm run db:seed

    ```
    This will seed the database
6. Run
  ```
  npm test

  ```
  to run the tests.
7. Run
  ```
  npm start

  ```
  Use [**Postman**](https://www.getpostman.com/) to consume the API.
8. Well...enjoy.

## Code Example

**Create a new user**
```
POST - /api/v1/users

Post data
{
  username: 'username',
  email: 'example@host.com'
  name: {
    last: 'lastname',
    first: 'firstname'
  }
  password: 'password',
  role: 'dummy role' // Role has to be created before assignation. viewer role is available by default
}
```

**********

**Login a user**
```
POST - /api/v1/users

Post data
{
  username: 'username',
  password: 'password'
}
```

**********

**Create a new document**

Documnent is created by an existing and authenticated user.

```
POST - /api/v1/users

Post data
{
  title: 'Documnent title',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}
```

***********

**Create a new role - Superadmin operation**

Role is created by an Authorized and Authenticated user (superadmin).

```
POST - /api/v1/users

Post data
{
  title: 'Trainer'
}
```

**********

## API Reference

API endpoints currently supported.

_*Users*_

Request type | Endpoint | Action 
------------ | -------- | ------
POST | /api/v1/users | Create a new user
GET | /api/v1/users | Get all users
GET | /api/v1/users:id | Get a specific user
PUT | /api/v1/users/:id | Update user information
DELETE | /api/v1/users/:id | Remove a user from storage

_*Documents*_

Request type | Endpoint | Action 
------------ | -------- | ------ 
POST | /api/v1/documents | Create a new document
GET | /api/v1/documents | Retrieve all documents 
GET | /api/v1/documents/:id | Retrieve a specific document
GET | /api/v1/users/:id/documents | Retrieve all documents created by a user
GET | /api/v1/documents/documents?role=:role | Retrieve all documents with a specific role
PUT | /api/v1/documents/:id | Update a specific document
DELETE | /api/v1/documents/:id | Remove a specific document from storage


_*Roles*_

Request type | Endpoint | Action 
------------ | -------- | ------ 
POST | /api/v1/roles | Create a new role 
GET | /api/v1/roles | Retrieve all roles 

_*Types*_

Request type | Endpoint | Action 
------------ | -------- | ------ 
POST | /api/v1/doc-types | Create a new document type 
GET | /api/v1/doc-types | Retrieve all document types 

Testing.
--------
This application has been tested using [**supertest**](https://www.npmjs.com/package/supertest), which is a Super-agent driven library for testing Node.js HTTP servers using a fluent API and [**Mocha**](https://mochajs.org), which is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing simple and fun.

Thank You.

[![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/built-by-developers.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/built-with-swag.svg)](http://forthebadge.com)

#### Seyi Adekoya | Andela #TIA