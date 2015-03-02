MetricSettings = require('../models/metric-settings');
Metric = require('../models/metric');
CronJob = require('cron').CronJob;
Runner = require('./runner');
_ = require('underscore');

module.exports = (function() {
    var jobs = [];

    function loadSettings(cb) {
        MetricSettings.findByCategory('schedule', function(err, settingss) {
            if(err) return cb(err);
            cb(null, settingss);
        });
    }

    function startNewScheduleMetric(settings) {
        if(settings.category != 'schedule') return;

        Runner.loadScheduleMetric(settings, function(err, result) {
            if(!err) Metric.create(settings.team, result);
        });
        scheduleJob(settings);
    }

    function startAllScheduleMetric() {
        loadSettings(function(err, settingss) {
            settingss.forEach(scheduleJob);
        });
    }

    function scheduleJob(settings) {
        if(settings.category != 'schedule') return;

        var frequency = "0 " + settings.frequency;
        var job = new CronJob(frequency, function(){
            Runner.loadScheduleMetric(settings, function(err, result) {
                if(!err) Metric.create(settings.team, result);
            });
        }, null, true);
        job.settings = settings;
        jobs.push(job);
    }

    function updateScheduleMetric(id, settings) {
        var jobIndex = jobs.indexOf(_.find(jobs, function(job) {
            return job.settings._id = id;
        }));
        if(jobIndex >= 0) {
            jobs[jobIndex].stop();
            jobs[jobIndex] = _.last(jobs);
            jobs.pop();
        }
        scheduleJob(settings);
    }

    return {
        startAllScheduleMetric: startAllScheduleMetric,
        updateScheduleMetric: updateScheduleMetric,
        StartNewScheduleMetric : startNewScheduleMetric
    }
})();

