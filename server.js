const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//see notes below??
const userRoutes = require('./controllers/api/userRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDEWARE SET UP FOR USER SESSION TRACKING
// Set Handlebars as the default templating engine
const hbs = exphbs.create({ helpers });

// Configure and link a session object with the sequelize store
const sess = {
  secret: "secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
<<<<<<< HEAD
// will the below code use ALL js filesin the controllers folder? therefore making the userRoutes.js file redundant?
=======
// app.use(express.static(path.join(__dirname, '/controllers/api')));

>>>>>>> b566ef8198d439c1f4a581519476445981432c15
app.use(routes);
// Use the userRoutes controller for requests to server-side authentication
app.use('/auth', userRoutes);

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
