const express = require('express');
const exphbs = require('express-handlebars');

// Set up Sequelize
// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

// Set Handlebars as the default templating engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Define routes and render a handlebars template
app.get('/', (req, res) => {
    const data = {
//add object content here to create template for key:value pairs
// e.g name: 'John Doe',
    }
    res.render('home', data);
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Configure and link a session object with the sequelize store
// const sess = {
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize
//     })
//   };
  
  // Add express-session and store as Express.js middleware
//   app.use(session(sess));

// Sequelize
// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//   });