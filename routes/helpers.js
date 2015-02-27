var express = require('express');
var router = express.Router();
var dateHelper = require('../helpers/date-helper');
var MetricSettings = require('../models/metric-settings');

router.get('/range/teams/:team/metrics/:metric/timeframes/:timeFrame', function(req, res, next) {
    MetricSettings.getInstance(req.params.team, req.params.metric, function (err, settings) {
        if(err) return res.json({error: err});
        if(!settings) return res.json({error: 'Settings not exist.'});

        var range = dateHelper.getDateRange(dateHelper.standardDay(new Date(), settings.startFrom, settings.timeFrame), req.params.timeFrame);
        range.start = dateHelper.formatDate(range.start);
        range.end = dateHelper.formatDate(range.end);
        res.json(range);
    });
});

module.exports = router;
