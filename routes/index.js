var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Measurement Metric' });
});


// For test
router.get('/create-metric', function(req, res, next) {
  res.render('metric-create');
});
router.get('/record-metric', function(req, res, next) {
  res.render('metric-record');
});

module.exports = router;
