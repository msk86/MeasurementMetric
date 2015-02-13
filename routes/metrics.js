var express = require('express');
var router = express.Router();

var MetricSettings = require('../models/metric-settings');
var Metric = require('../models/metric');

router.get('/settings', function(req, res, next) {
    MetricSettings.all(function(err, settingses) {
        res.json(settingses);
    });
});

router.get('/:metric/settings', function (req, res, next) {
    MetricSettings.getInstance(req.params.metric, function (err, settings) {
        res.json(settings);
    });
});

/* create metric setting */
router.post('/:metric/settings', function (req, res) {
    var params = req.body;
    MetricSettings.create(params);
    res.status(201);
    res.send("Metric settings saved");
});

/* create metric setting */
router.post('/:metric', function (req, res) {
    var params = req.body;
    params.metricName = req.params.metric;
    Metric.create(params);
    res.status(201);
    res.send("Metric Data saved");
});

router.get('/:metric/timeframes/:timeFrame.json', function(req, res, next) {
    Metric.loadInTimeFrame(req.params.metric, req.params.timeFrame, function(err, data) {
        res.json(data);
    });
});

router.get('/:metric/timeframes/:timeFrame/pie.json', function(req, res, next) {
    Metric.pieInTimeFrame(req.params.metric, req.params.timeFrame, function(err, data) {
        res.json(data);
    });
});

router.get('/:metric/timeframes/:timeFrame/trends.json', function (req, res, next) {
    Metric.trendsInTimeFrame(req.params.metric, req.params.timeFrame, function(err, data) {
        res.json(data);
    });
});


module.exports = router;
