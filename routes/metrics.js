var express = require('express');
var router = express.Router();
var MetricSetting = require('../models/metric-setting');

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

module.exports = router;
