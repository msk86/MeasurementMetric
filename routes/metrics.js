var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();

var databaseUrl = "mydb";
var collections = ["metric"];
var db = mongojs.connect(databaseUrl, collections);
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

/* create metric form */
router.post('/:metric', function (req, res) {
    var params = req.body;
    params['created_time'] = new Date();
    db.metric.insert({message: params});
    db.metric.save();
    res.status(201);
    res.send("Metric saved");
});

module.exports = router;
