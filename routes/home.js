const express = require('express');
const router = express.Router();
const cache = require('../middleware/cache')
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.route('/')
  .get((req, res) => {
    res.render('templates/home', (err, html) => {
        cache.cacheMiss(req.originalUrl, html)
        res.send(html);
      })
  })

router.route('/login')
  .get((req, res) => {
    res.render('templates/login', (err, html) => {
        cache.cacheMiss(req.originalUrl, html)
        res.send(html);
      })
  })
  .post(passport.authenticate('local', {
    successRedirect: '/projects',
    failureRedirect: '/login',
  }))

router.route('/user')
  .post((req,res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.log(err);
      }
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        console.log('hash: ', hash);
        User.create({ username: req.body.username, password: hash})
        .then(function (user) {
          res.redirect('/');
        });
      })
    })
  })

router.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/login');
    })

router.route('/register')
  .get((req, res) => {
    res.render('templates/register', (err, html) => {
        cache.cacheMiss(req.originalUrl, html)
        res.send(html);
      });
  })
module.exports = router;