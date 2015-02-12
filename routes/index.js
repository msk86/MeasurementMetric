var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Measuresdffd Metric' });
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

module.exports = router;
