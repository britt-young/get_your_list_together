const express = require("express");
const router = express.Router();
const { User } = require("../../models");

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

// User Sign-Up
function signUp() {
  const username = document.getElementById('username').value; //NEED TO INCLUDE IN HANDLEBARS HTML
  const email = document.getElementById('email-signup').value;
  const password = document.getElementById('password-signup').value;
  const zipCode = document.getElementById('zip-code').value; //NEED TO INCLUDE IN HANDLEBARS HTML

  firebase.auth().createUserWithEmailAndPassword(email, password)
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
        zipCode: zipCode,
      };

      // Store user data in "Firestore" (FireBase service)
      //creating a "collection" in Firestore named "profiles" containing a "userData" object with username, email, and zipcode
      firebase.firestore().collection('profiles').doc(user.uid).set(userData);

      console.log('User signed up:', user);
    })
    .catch((error) => {

      // Handle errors during sign-up
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Sign-up error:', errorCode, errorMessage);
    });
}

// User Sign-In
function signIn() {
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {

      // User signed in successfully
      const user = userCredential.user;
      console.log('User signed in:', user);
    })
    .catch((error) => {

      // Handle errors during sign-in
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Sign-in error:', errorCode, errorMessage);
    });
}

// User Sign-Out
function signOut() {
  firebase.auth().signOut()
    .then(() => {

      // User signed out successfully
      console.log('User signed out');
    })
    .catch((error) => {

      // Handle errors during sign-out
      console.error('Sign-out error:', error);
    });
}


