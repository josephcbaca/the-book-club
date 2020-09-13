const db = require("../models");
const passport = require("../config/passport");
const { default: Axios } = require("axios");
require('dotenv').config();

module.exports = function (app) {

  app.get("/api/test", function (req, res) {
    res.json({ Result: "OK! React can connect to the backend server." });
  });


  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.Reader.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => res.end())
      .catch(err => {
        res.status(401).json(err);
      });
  });


  // Routes for page redirection
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res, next) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({ user: null });
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        user: req.user
      });
    }
  });

  app.get("/api/search-books", (req, res) => {
    console.log(req.body.searchBooks)
    let book = req.body.searchBooks
    let apiKey = process.env.DB_API
    Axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"+inauthor:keyes&key="+apiKey+"&maxResults=10")
    .then(data => {
  
      console.log(data.data.items)
      res.json(data.data.items)
    })
  });


  

  // 

  // Library
  // GET route for retrieiving books for specific readers
  app.get("/api/library", (req, res) => {
    db.Book.findAll({
      where: {
        ReaderId: req.Reader.id
      }
    }).then(data => {
      console.log(data)
      res.json(data);
    });
  });

  // // DELETE route for deleting book off out of book library
  // app.delete("/api/library/:id", (req, res) => {
  //   db.Book.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(data => {
  //     res.json(data).end();
  //   });
  // });
}