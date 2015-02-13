var express = require('express');
var router = express.Router();

var MetricSettings = require('../models/metric-settings');
var Metric = require('../models/metric');

/* GET users listing. */

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

router.get('/story/timeframes/week/pie.json', function (req, res, next) {
    res.json({
            "metricName": "Stories",
            "metricDesc": "Finished stories in current iteration",
            "timeFrame": "week",
            "pie": {
                "userStory": [{"x": "2015-02-09", "y": 5, "date": "2015-02-09"}],
                "bug": [{"x": "2015-02-09", "y": 2, "date": "2015-02-09"}],
                "techTask": [{"x": "2015-02-09", "y": 2, "date": "2015-02-09"}]
            }
        }
    )
});

router.get('/story/timeframes/week/trends.json', function (req, res, next) {
    res.json({
            "metricName": "Stories",
            "metricDesc": "Finished stories in current iteration",
            "timeFrame": "week",
            "trends": {
                "all": [
                    {"x": "2015-02-09", "y": 0, "date": "2015-02-09"},
                    {"x": "2015-02-10", "y": 2, "date": "2015-02-10"},
                    {"x": "2015-02-11", "y": 3, "date": "2015-02-11"},
                    {"x": "2015-02-12", "y": 5, "date": "2015-02-12"},
                    {"x": "2015-02-13", "y": 8, "date": "2015-02-13"},
                    {"x": "2015-02-14", "y": 8, "date": "2015-02-14"},
                    {"x": "2015-02-15", "y": 8, "date": "2015-02-15"}
                ],
                "userStory": [
                    {"x": "2015-02-09", "y": 0, "date": "2015-02-09"},
                    {"x": "2015-02-10", "y": 2, "date": "2015-02-10"},
                    {"x": "2015-02-11", "y": 2, "date": "2015-02-11"},
                    {"x": "2015-02-12", "y": 4, "date": "2015-02-12"},
                    {"x": "2015-02-13", "y": 5, "date": "2015-02-13"},
                    {"x": "2015-02-14", "y": 5, "date": "2015-02-14"},
                    {"x": "2015-02-15", "y": 5, "date": "2015-02-15"}
                ],
                "bug": [
                    {"x": "2015-02-09", "y": 0, "date": "2015-02-09"},
                    {"x": "2015-02-10", "y": 0, "date": "2015-02-10"},
                    {"x": "2015-02-11", "y": 1, "date": "2015-02-11"},
                    {"x": "2015-02-12", "y": 1, "date": "2015-02-12"},
                    {"x": "2015-02-13", "y": 2, "date": "2015-02-13"},
                    {"x": "2015-02-14", "y": 2, "date": "2015-02-14"},
                    {"x": "2015-02-15", "y": 2, "date": "2015-02-15"}
                ],
                "techTask": [
                    {"x": "2015-02-09", "y": 0, "date": "2015-02-09"},
                    {"x": "2015-02-10", "y": 0, "date": "2015-02-10"},
                    {"x": "2015-02-11", "y": 0, "date": "2015-02-11"},
                    {"x": "2015-02-12", "y": 0, "date": "2015-02-12"},
                    {"x": "2015-02-13", "y": 1, "date": "2015-02-13"},
                    {"x": "2015-02-14", "y": 1, "date": "2015-02-14"},
                    {"x": "2015-02-15", "y": 1, "date": "2015-02-15"}
                ]
            }
        }
    )
});


module.exports = router;
