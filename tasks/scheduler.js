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

    function runJob(settings) {
        Runner.loadScheduleMetric(settings, function(err, result) {
            if(!err) Metric.create(settings.team, result);
        });
    }

    function startNewScheduleMetric(settings, cb) {
        if(settings.category != 'schedule') return;
        runJob(settings);
        scheduleJob(settings, cb);
    }

    function startAllScheduleMetric() {
        loadSettings(function(err, settingss) {
            settingss.forEach(scheduleJob);
        });
    }

    function scheduleJob(settings, cb) {
        if(settings.category != 'schedule') return;

        try {
            var frequency = "0 " + settings.frequency;
            var job = new CronJob(frequency, function(){
                Runner.loadScheduleMetric(settings, function(err, result) {
                    if(!err) Metric.create(settings.team, result);
                });
            }, null, true);
            job.settings = settings;
            jobs.push(job);
            if(typeof cb == 'function') cb();
        } catch(e) {
            if(typeof cb == 'function') cb('Frequency is incorrect.');
        }

    }

    function updateScheduleMetric(id, settings, cb) {
        var jobIndex = jobs.indexOf(_.find(jobs, function(job) {
            return job.settings._id = id;
        }));
        if(jobIndex >= 0) {
            jobs[jobIndex].stop();
            jobs[jobIndex] = _.last(jobs);
            jobs.pop();
        }
        runJob(settings);
        scheduleJob(settings, cb);
    }

    return {
        startAllScheduleMetric: startAllScheduleMetric,
        updateScheduleMetric: updateScheduleMetric,
        StartNewScheduleMetric : startNewScheduleMetric
    }
})();

