const express = require("express");
const sequelize = require("../../config/connection");
const firebase = require("@firebase/app");
require("@firebase/auth");
const router = express.Router();
const { User } = require("../../models");

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

// User Sign-Up
function signUp() {
  const username = document.getElementById("username").value;       //NEED TO INCLUDE IN HANDLEBARS HTML
  const email = document.getElementById("email-signup").value;
  const password = document.getElementById("password-signup").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed up successfully
      const user = userCredential.user;

      // Update users profile with username and additional data
      return user.updateProfile({
        displayName: username,
      });
    })
    .then(() => {
      // Retrieve the Firebase Authentication ID of user AFTER signup
      const user = firebase.auth().currentUser;
      const userData = {
        username: username,
        email: email,
      };

      // Store user data in "Firestore" (FireBase service)
      //creating a "collection" in Firestore named "profiles" containing a "userData" object with username, email, and zipcode
      firebase.firestore().collection("profiles").doc(user.uid).set(userData);

      console.log("User signed up:", user);
    })
    .catch((error) => {
      // Handle errors during sign-up
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign-up error:", errorCode, errorMessage);
    });
}
async function createUser(req, res) {
  try {
    // Create a record in the MySQL database
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,          // Hashed password in Users.js model
      email: req.body.email,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser.toJSON() });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Call the asynchronous function when handling a request, for example in an Express route
app.post('/signup', async (req, res) => {
  await createUser(req, res);
});

//-------------------------------------------END OF SIGN UP CODE----------------------------------------------//
// User Sign-In
function signIn() {
  const username = document.getElementById("username").value; //NEED TO INCLUDE IN HANDLEBARS HTML
  const password = document.getElementById("signin-password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      // User signed in successfully
      const user = userCredential.user;
      console.log("User signed in:", user);
    })
    .catch((error) => {
      // Handle errors during sign-in
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign-in error:", errorCode, errorMessage);
    });
}

//-------------------------------------------END OF SIGN IN CODE----------------------------------------------//
// User Sign-Out
function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // User signed out successfully
      console.log("User signed out");
    })
    .catch((error) => {
      // Handle errors during sign-out
      console.error("Sign-out error:", error);
    });
}

//-------------------------------------------END OF SIGN OUT CODE----------------------------------------------//
module.exports = router;
