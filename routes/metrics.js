var express = require('express');
var router = express.Router();

var MetricSettings = require('../models/metric-settings');

/* GET users listing. */

router.get('/:metric/settings', function(req, res, next) {
  var settings = {
    metricName: 'Story',
    metricTypes: ['UserStory', 'Bug', 'TechTask'],
    metricUnit: '',
    processMethod: 'total',
    fields: ['StoryNo', 'StoryName'],
    timeFrame: 'week'
  };
  //var settings = MetricSetting.getInstance(req.params.metric);

  res.json(settings);
});

/* create metric setting */
router.post('/:metric/settings', function (req, res) {
    var params = req.body;
    MetricSettings.create(params);
    res.status(201);
    res.send("Metric saved");
});

module.exports = router;
