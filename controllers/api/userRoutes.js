const express = require("express");
<<<<<<< HEAD
const sequelize = require("../../config/connection");
const firebase = require("@firebase/app");
require("@firebase/auth");
=======
>>>>>>> b566ef8198d439c1f4a581519476445981432c15
const router = express.Router();
const { User } = require("../../models");
const firebase = require("@firebase/app");
require("@firebase/auth");

const firebaseConfig = {
    // Firebase configuration here
    // See https://firebase.google.com/docs/web/setup#add-sdks-initialize
    apiKey: "AIzaSyDFoSC3hpc6WmwBSPyp4GyFI-YTjH303nI",
    authDomain: "get-your-list-together.firebaseapp.com",
    projectId: "get-your-list-together",
    storageBucket: "get-your-list-together.appspot.com",
    messagingSenderId: "758683039200",
    appId: "1:758683039200:web:d94652bcf5a0d3c1ece785"
  };
  
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//SIGN UP ROUTE---------------------------------------------------------------------------
router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;

  try {
// Firebase user signup logic
    const newUserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = newUserCredential.user;

// Create a record in the MySQL database (using Sequelize)
    const newUser = await User.create({
      username: username,
      email: email,
      firebaseUid: user.uid,
    });

    console.log("User signed up:", newUser);

// Respond with a success message or other data
    res.status(201).json({ message: 'User signed up successfully', user: newUser.toJSON() });
  } catch (error) {
    // Handle errors during signup
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Sign-up error:", errorCode, errorMessage);

// Respond with an error message
    res.status(500).json({ error: 'Internal server error' });
  }

// Save user-related information in the session
req.session.save(() => {
  req.session.username = userData.username;
  req.session.logged_in = true;
});
});

//SIGN IN ROUTE---------------------------------------------------------------------------
// Define a signin route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
// Firebase user signin logic
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

// Retrieve user data from FireBase database (Firestore)
    const existingUser = await User.findOne({ where: { firebaseUid: user.uid } });

    console.log("User signed in:", existingUser);

// Respond with a success message or other data
    res.status(200).json({ message: 'User signed in successfully', user: existingUser.toJSON() });
  } catch (error) {

// Handle errors during signin
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Sign-in error:", errorCode, errorMessage);

// Respond with an error message
    res.status(401).json({ error: 'Incorrect email or password' });
  }

// If email and password are valid, save user-related information in the session
req.session.save(() => {
  req.session.user_id = userData.id;
  req.session.logged_in = true;
  });
});

//SIGN OUT ROUTE---------------------------------------------------------------------------
router.post('/signout', (req, res) => {
  try {
// Sign out the currently authenticated user using Firebase Authentication
    firebase.auth().signOut();

// Can clear any server-side session data or perform additional cleanup if needed

    console.log("User signed out");

// Respond with a success message or other data
// Respond with No Content on successful logout
    res.status(204).end(); 
  } catch (error) {

// Handle errors during signout
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Sign-out error:", errorCode, errorMessage);

// Respond with an error message
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;