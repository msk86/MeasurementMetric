var express = require('express');
var router = express.Router();
var envHelper = require('../helpers/env-helper');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/dashboard', function (req, res, next) {
    var team = req.body.team;
    res.redirect('/' + team.replace(/ /g, '+'), 302);
});

router.get('/:team', function (req, res, next) {
    var team = req.params.team;

    res.render('dashboard', {title: 'Measurement Metric [' + team + ']', team: team, isProduction: envHelper.isProd()});
});

module.exports = router;
