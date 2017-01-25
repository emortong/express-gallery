const express = require('express');
const router = express.Router();
const db = require('../models');
const Project = db.Project;
const cache = require('../middleware/cache')

router.route('/')
  .get((req, res) => {
    Project.findAll()
      .then( project => {
        res.render('templates/projects', {project}, (err, html) => {
        cache.cacheMiss(req.originalUrl, html)
        res.send(html);
      });
      })
  })



module.exports = router;