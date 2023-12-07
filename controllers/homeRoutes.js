//use router.get
const router = require("express").Router();
// const { User } = require('../models');
const productList = require("../public/js/productsAPI.json")

router.get("/", async (req, res) => {
  try {
    res.render("homepage");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/homepage", async (req, res) => {
  try {
    res.render("homepage");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/produce", async (req, res) => {
  try {
    res.render("produce");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/recipes", async (req, res) => {
  try {
    res.render("recipes");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/cart", async (req, res) => {
  try {
    res.render("cart");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/signin", async (req, res) => {
  try {
    res.render("signed in");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/list", async (req, res) => {
  try {
    res.send(productList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
