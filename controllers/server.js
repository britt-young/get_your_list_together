const path = ('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./');
const helpers = require('../utils/helpers');
const sequelize = require('../config/connection');

// Set up Sequelize
// const path = require('path');
// const session = require('express-session');
// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

const app = express();
// const PORT = process.env.PORT || 3000;


// Set Handlebars as the default templating engine
const hbs = exphbs.create({ helpers });

// app.engine('handlebars', exphbs());
app.engine('handlebars', hbs.engine);

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
//     secret: "secret",
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize
//     })
//   };
  
// // Add express-session and store as Express.js middleware
//   app.use(session(sess));
//   app.engine('handlebars', hbs.engine);
//   app.set('view engine', 'handlebars');

//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(express.static(path.join(__dirname, 'public')));

// // Sequelize
// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
//   });
