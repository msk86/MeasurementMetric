var express = require('express');
var router = express.Router({mergeParams: true});
var _ = require('underscore');

var mongojs = require('mongojs');
var databaseUrl = "mydb";
var collections = ["settings", "metric"];
var db = mongojs.connect(databaseUrl, collections);

router.get('/teams', function(req, res, next) {
    db.settings.find({}, function(err, settingses) {
        var teamBasedSettings = _.groupBy(settingses, function(settings) {
            return settings.team;
        });

        var teamBasedSettingCount = _.map(teamBasedSettings, function(settingses, team) {
            return {team: team, count: settingses.length};
        });

        res.json(teamBasedSettingCount);
    });
});

router.get('/teams/:team', function(req, res, next) {
    db.metric.find({team: req.params.team}, function(err, metrics) {
        var nameBasedMetric = _.groupBy(metrics, function(metric) {
            return metric.metricName;
        });

        var nameBasedMetricCount = _.map(nameBasedMetric, function(metrics, name) {
            return {metricName: name, count: metrics.length};
        });

        res.json(nameBasedMetricCount);
    });
});

module.exports = router;
