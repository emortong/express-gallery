const express = require('express');
const router = express.Router();
const cache = require('../middleware/cache')

router.route('/')
  .get((req, res) => {
    res.render('templates/home', (err, html) => {
        cache.cacheMiss(req.originalUrl, html)
        res.send(html);
      })
  })

module.exports = router;