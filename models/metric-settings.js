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
                metricName: metricName
            }, function(err, metricSettings) {
                if(err) return cb(err);
                cb(null, metricSettings);
            });
        },
        create: function(metricCategory, settings) {
            if(settings.category == 'schedule') {
                ScheduleMetricSettings.create(settings);
            } else {
                NormalMetricSettings.create(settings);
            }
        }
    };
})();
