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
    npm i

    ```
    This will install the required dependencies.
5. Run
  ```
  npm test

  ```
  to run the tests.
6. Run
  ```
  npm start

  ```
  Use [**Postman**](https://www.getpostman.com/) to consume the API.
7. Well...enjoy.

Testing.
--------
This application has been tested using [**supertest**](https://www.npmjs.com/package/supertest), which is a Super-agent driven library for testing Node.js HTTP servers using a fluent API and [**Mocha**](https://mochajs.org), which is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing simple and fun.

Thank You.

[![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/built-by-developers.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/built-with-swag.svg)](http://forthebadge.com)

#### Seyi Adekoya | Andela #TIA