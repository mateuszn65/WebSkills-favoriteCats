# Favorite Cats App

The Cat App is a web application that allows users to view and favorite cats.


## Ready heroku app

https://favorite-cats.herokuapp.com/


### Admin credentials for heroku app were send by an email


## Local Installation


### Prerequisites

* Installed [Node.js](https://nodejs.org/en/download/)

* Installed [MongoDB](https://docs.mongodb.com/manual/installation/)


### Installation

1. Create .env file in the root directory and add the following:
    * DATABASE_URL=mongodb://localhost:27017/\<database-name>
    * SESSION_SECRET=\<secret>
    * SESSION_MAX_AGE=\<value in milliseconds>
    * PORT=\<port> if you want to run the app on port different than 3000

2. Install NPM packages

```bash
npm install
```

3. Run the app

```bash
npm start
```

4. Open the app in the browser at http://localhost:3000 or the port you specified in the .env file.


## Usage


### Home page

The home page displays top 5 cats that are most favorited by users. The cats are displayed in a carousel. Clicking on the cat image will open the cat details page.


### Cat list page

The cat list page displays all cats. The cats are displayed in a grid. Clicking on the cat image will open the cat details page.


### Cat details page

The cat details page displays the cat image, name, short and long description.


### Login page

The login page allows users to login or register. After successful login, the user is redirected to the home page. If the user is already logged in, the login page is not accessible.


### Favorite cats page

After successful login, the user can access the favorite cats page, add and remove cats from that list by clicking the heart icon. The favorite cats page displays all cats that the user has favorited.


### Admin user

The app has an admin user that can be used to add, edit and delete cats directly from the app. To create an admin user you need to add admin flag to the user document in the database. 


## Built With

* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Express.js](https://expressjs.com/) - Web framework for Node.js
* [MongoDB](https://www.mongodb.com/) - NoSQL database
* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
* [EJS](https://ejs.co/) - A templating engine for Node.js
