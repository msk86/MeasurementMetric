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
        if(settings.category != 'schedule') return;
        Runner.loadScheduleMetric(settings, function(err, results) {
            if(err) return console.log(err);
            Metric.createInBatch(settings.team, settings.metricName, results, function(err) {
                if(err) console.log(err);
            });
        });
    }

    function startNewScheduleMetric(settings) {
        runJob(settings);
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
            runJob(settings);
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
        runJob(settings);
        scheduleJob(settings);
    }

    function validScheduleJob(settings) {
        if(settings.category != 'schedule') return;
        validFrequency(settings);
        validApiMethod(settings);
    }

    function validFrequency(settings) {
        var frequency = "0 " + settings.frequency;
        if(frequency.split(' ').length != 6) throw 'Frequency is invalid';
        try {
            new CronJob(frequency, function(){}, null, false);
        } catch(e) {
            throw 'Frequency is invalid';
        }
    }

    function validApiMethod(settings) {
        var apiMethod = (settings.apiMethod || '').toString().trim().replace(/^function.*?\(/, 'function $x(');
        try {
            eval(apiMethod);
        } catch(e) {
            throw 'API method is not a function';
        }
        if(typeof $x != 'function') throw 'API method is not a function';
    }

    return {
        startAllScheduleMetric: startAllScheduleMetric,
        updateScheduleMetric: updateScheduleMetric,
        StartNewScheduleMetric : startNewScheduleMetric,
        validScheduleJob: validScheduleJob
    }
})();

