const express = require("express");
const router = express.Router();
const { User } = require("../../models");

  // Your Firebase configuration
  //MUST REPLACE WITH USABLE DATA FROM FIREBASE AUTH!!!!!
  const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  

    //User signup route (HTTP POST request)
router.post('/signup', async (req, res) => {
  try {
    //Validate the users data
    const { username, password, email, zip } = req.body;

    //Create the new user if validation passes
    const newUser = await User.create({ username, password, email, zip });       //DOES THIS DATA NEED TO BE SAVED IN A SESSION REQ SAVE()?------

    //Catch error logic
    res.json(newUser);
  } catch (error) {
    console.error(error);

    //Handle validation errors
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      res.status(400).json({ errors: validationErrors });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
});

    //User login route (HTTP POST request)
router.post('/login', async (req, res) => {
    try {
      //Retrieve user data from the database based on the provided email in the request body
      const userData = await User.findOne({ where: { email: req.body.email } });                              //DOES THIS CONST NEED TO BE CHANGED TO MATCH newUser ABOVE?------
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      //Validate the provided password against the hashed password stored in the database
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      //If valid, create a new session and store the user_id and logged_in status-----
      req.session.save(() => {
        req.session.user_id = userData.id;  //Set the user_id property in the session to the id of the authenticated user
        req.session.logged_in = true;
        req.session.user_data = {
          username: userData.username,
          email: userData.email,
          // Add any additional user-related data from the user profile database------
          cart: userProfileData,
        };

        res.json({ user: userData, message: 'You are now logged in!' });
      });
      //Error handling
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  //User logout route (HTTP POST request)
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
