var mongojs = require('mongojs');

var databaseUrl = "mydb";
var collections = ["settings"];
var db = mongojs.connect(databaseUrl, collections);

NormalMetricSettings = require('../models/normal-metric-settings');
ScheduleMetricSettings = require('../models/schedule-metric-settings');

module.exports = (function() {
    return {
        getInstance: function(metricName, cb) {
            db.settings.findOne({
                metricName: metricName
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
            db.settings.find({}, cb);
        },
        findByCategory: function(category, cb) {
            db.settings.find({
                metricCategory: category
            }, cb);
        }
    };
})();
