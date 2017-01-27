const express = require('express');
const router = express.Router();
const db = require('../models');
const Project = db.Project;
const cache = require('../middleware/cache')


const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return next();
}

const isObjEmpty = (req, res, next) => {
  if(Object.keys(req.body).length === 0) {
    res.redirect('projects/new');
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

router.route('/')
  .get((req, res) => {
    Project.findAll()
      .then( project => {
        res.render('templates/projects', {project, user: req.user[0].isAdmin}, (err, html) => {
        cache.cacheMiss(req.originalUrl, html)
        res.send(html);
      });
      })
  })
  .post(isObjEmpty, isAuthenticated, (req,res) => {
    Project.create({
      link: req.body.link,
      description: req.body.description,
      AuthorId: req.body.authorId
    })
    .then( project => {
      res.redirect('/projects')
    })
    .catch((err) => {
      console.log(err);
    })
  })

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
      res.render('templates/project', {project, user: req.user[0].isAdmin}, (err, html) => {
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
        res.redirect(`/projects/${req.params.id}`);
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