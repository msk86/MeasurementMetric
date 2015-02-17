var mongojs = require('mongojs');

var databaseUrl = "mydb";
var collections = ["metric"];
var db = mongojs.connect(databaseUrl, collections);

NormalMetricSettings = require('../models/normal-metric-settings');
ScheduleMetricSettings = require('../models/schedule-metric-settings');

module.exports = (function() {
    return {
        getInstance: function(metricName, cb) {
            db.metric.findOne({
                metricName: metricName,
                settings: true
            }, cb);
        },
        create: function(settings, cb) {
            if(settings.category == 'schedule') {
                ScheduleMetricSettings.create(settings, cb);
            } else {
                NormalMetricSettings.create(settings, cb);
            }
        },
        all: function(cb) {
            db.metric.find({
                settings: true
            }, cb);
        },
        findByCategory: function(category, cb) {
            db.metric.find({
                settings: true,
                metricCategory: category
            }, cb);
        }
    };
})();
