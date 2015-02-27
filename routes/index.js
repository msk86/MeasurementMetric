var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Measurement Metric' });
});

router.get('/:team', function(req, res, next) {
  res.render('dashboard', { title: 'Measurement Metric', team: req.params.team });
});

module.exports = router;
