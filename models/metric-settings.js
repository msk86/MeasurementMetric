var mongojs = require('mongojs');

var databaseUrl = "mydb";
var collections = ["settings"];
var db = mongojs.connect(databaseUrl, collections);

NormalMetricSettings = require('../models/normal-metric-settings');
ScheduleMetricSettings = require('../models/schedule-metric-settings');

module.exports = (function() {
    return {
        getInstance: function(team, metricName, cb) {
            db.settings.findOne({
                team: team,
                metricName: metricName
            }, cb);
        },
        create: function(team, settings, cb) {
            this.getInstance(team, settings.metricName, function(e, s) {
                if(e) return cb(e);
                if(s) return cb('Metric settings exist.');

                settings.team = team;
                if(settings.category == 'schedule') {
                    ScheduleMetricSettings.create(settings, cb);
                } else {
                    NormalMetricSettings.create(settings, cb);
                }
            });
        },
        update: function(id, settings, cb) {
            if(settings.category == 'schedule') {
                ScheduleMetricSettings.update(settings._id, settings, cb);
            } else {
                NormalMetricSettings.update(settings._id, settings, cb);
            }
        },
        all: function(team, cb) {
            db.settings.find({team: team}).sort({createdTime: 1}, cb);
        },
        findByCategory: function(category, cb) {
            db.settings.find({
                category: category
            }, cb);
        }
    };
})();
