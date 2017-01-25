// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const cache = require('../middleware/cache')

// router.route('/login')
//   .get((req, res) => {
//     res.render('templates/login', (err, html) => {
//         cache.cacheMiss(req.originalUrl, html)
//         res.send(html);
//       })
//   })
//   .post(passport.authenticate('local', {
//     successRedirect: '/projects',
//     failureRedirect: '/login',
//   }))

// module.exports = router;