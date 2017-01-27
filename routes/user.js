const express = require('express');
const router = express.Router();
const db = require('../models');
const User = db.User;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.route('/')
  .post((req,res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.log(err);
      }
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        console.log('hash: ', hash);
        User.create({ username: req.body.username, password: hash, isAdmin: false})
        .then(function (user) {
          res.redirect('/');
        });
      })
    })
  })

module.exports = router;


