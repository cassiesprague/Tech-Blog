//Used the following videos or class activities to help with this project
//14-MVC 28-Stu_Mini-Project

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//This code is used to set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

//This configuration sets up session handling middleware for Express.js, defining how sessions are managed and stored in the application.
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(routes);

//This code synchronizes the Sequelize models with the database and starts the Express.js server to handle incoming requests once the synchronization process is complete.
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});