const express = require("express");
const router = express.Router();
const { User } = require("../../models");

    //User signup route
router.post("/signup", async (req, res) => {
  try {
    //Validate the users data
    const { username, password, email, zip } = req.body;

    //Create the new user if validation passes
    const newUser = await User.create({ username, password, email, zip });

    // Other logic for successful registration
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

    //User login route
/* 
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
 */
