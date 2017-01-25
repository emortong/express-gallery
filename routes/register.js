const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const cache = require('../middleware/cache')

router.route('/register')
  .get((req, res) => {
    res.render('templates/register', (err, html) => {
        cache.cacheMiss(req.originalUrl, html)
        res.send(html);
      });
  })


module.exports = router;