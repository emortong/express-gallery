const express = require('express');
const router = express.Router();
const db = require('../models');
const Project = db.Project;
const bodyParser = require('body-parser');
const cache = require('../middleware/cache')


const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return next();
}

const isObjEmpty = (req, res, next) => {
  if(Object.keys(req.body).length === 0) {
    res.redirect('gallery/new');
  } else {
    next()
  }
}

const isValidRoute = (req, res, next) => {
  Project.findAll({
    where: {
      id: req.params.id
    }
  })
  .then( project => {
    console.log(project);
    if(project.length !== 0){
      next();
    } else {
      res.render('templates/404')
    }
  })
  .catch( e => {
    res.render('templates/404');
  })
}

router.route('/new')
  .get(isAuthenticated,(req, res) => {
      res.render('templates/new', (err, html) => {
        cache.cacheMiss(req.originalUrl, html)
        res.send(html);
      })
    })

router.route('/:id')
  .get(isValidRoute,(req, res) => {
    Project.findAll({
      where: {
        id: req.params.id
      }
    })
    .then( project => {
      project = project[0].dataValues;
      res.render('templates/project', {project}, (err, html) => {
        cache.cacheMiss(req.originalUrl, html)
        res.send(html);
      });
    })

  })
  .put(isValidRoute, isObjEmpty, isAuthenticated, (req, res) => {
    Project.update({
      link: req.body.link,
      description: req.body.description
    },{
      where: {
        id: req.params.id
      }
    })
    .then( project => {
        res.redirect(`/gallery/${req.params.id}`);
    })
    .catch((err) => {
      console.log(err.errors);
      res.json(err.errors[0].message);
    })
  })
  .delete(isValidRoute, isAuthenticated,(req,res) => {
    Project.destroy({
      where: {
        id: req.params.id
      }
    })
    .then( project => {
        res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    })
  })

router.route('/')
  .post(isObjEmpty, isAuthenticated, (req,res) => {
    Project.create({
      link: req.body.link,
      description: req.body.description,
      AuthorId: req.body.authorId
    })
    .then( project => {
      console.log('hello');
      res.redirect('/projects')
    })
    .catch((err) => {
      console.log(err);
    })
  })

router.route('/:id/edit')
  .get(isValidRoute, isAuthenticated, (req,res) => {
    Project.findAll({
      where: {
        id: req.params.id
      }
    })
    .then( project => {
      project = project[0].dataValues;
      res.render('templates/edit', {project}, (err, html) => {
        cache.cacheMiss(req.originalUrl, html)
        res.send(html);
      })
    })
    .catch((err) => {
      console.log(err);
    })
  })

    router.route("*")
    .get((req,res) => {
      res.render('templates/404');
  });

module.exports = router;

