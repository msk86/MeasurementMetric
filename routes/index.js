var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/dashboard', function(req, res, next) {
  var team = req.body.team;
  res.redirect('/' + team.replace(/ /g, '+'), 302);
});

router.get('/:team', function(req, res, next) {
  res.render('dashboard', { title: 'Measurement Metric', team: req.params.team });
});

module.exports = router;
