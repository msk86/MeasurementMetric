var express = require('express');
var router = express.Router();

var MetricSettings = require('../models/metric-settings');

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
    res.send("Metric saved");
});


router.get('/:metric/timeframes/fortnight.json', function (req, res, next) {
    res.json({
            "metricName": "RecoveryTime",
            "metricDesc": "Finished stories in current iteration",
            "timeFrame": "fortnight",
            "timeRange": {
                "start": "15/02/09",
                "end": "15/02/15"
            },
            "value": {
                "all": 8,
                "userStory": 5,
                "bug": 2,
                "techTask": 1
            },
            "previousValue": {
                "all": 10,
                "userStory": 5,
                "bug": 4,
                "techTask": 1
            }
        }
    )
});

router.get('/story/timeframes/week/pie.json', function (req, res, next) {
    res.json({
            "metricName": "Stories",
            "metricDesc": "Finished stories in current iteration",
            "timeFrame": "week",
            "pie": {
                "all": [{"x": "2015-02-09", "y": 8, "date": "2015-02-09"}],
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
