var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Measurement Metric' });
});


// For test
router.get('/create', function(req, res, next) {
  res.render('metric-create');
});

module.exports = router;
