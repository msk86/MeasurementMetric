var express = require('express');
var router = express.Router();

var MetricSettings = require('../models/metric-settings');

/* GET users listing. */

router.get('/:metric/settings', function(req, res, next) {
  MetricSettings.getInstance(req.params.metric, function(err, settings) {
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



router.get('/:metric/timeframes/fortnight.json', function(req, res, next) {
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



module.exports = router;
