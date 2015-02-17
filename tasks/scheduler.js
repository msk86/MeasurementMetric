MetricSettings = require('../models/metric-settings');
Metric = require('../models/metric');
CronJob = require('cron').CronJob;
Runner = require('./runner');

module.exports = (function() {
    function loadSettings(cb) {
        MetricSettings.findByCategory('schedule', function(err, settingss) {
            if(err) return cb(err);
            cb(null, settingss);
        });
    }

    function startNewScheduleMetric(settings) {
        Runner.loadScheduleMetric(settings, function(err, result) {
            if(!err) Metric.create(result);
        });
        scheduleJob(settings);
    }

    function startAllScheduleMetric() {
        loadSettings(function(err, settingss) {
            settingss.forEach(scheduleJob);
        });
    }

    function scheduleJob(settings) {
        var frequency = "0 " + settings.frequency;
        new CronJob(frequency, function(){
            Runner.loadScheduleMetric(settings, function(err, result) {
                if(!err) Metric.create(result);
            });
        }, null, true);
    }

    return {
        startAllScheduleMetric: startAllScheduleMetric,
        StartNewScheduleMetric : startNewScheduleMetric
    }
})();

