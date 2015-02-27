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
            settings.team = team;
            if(settings.category == 'schedule') {
                ScheduleMetricSettings.create(settings, cb);
            } else {
                NormalMetricSettings.create(settings, cb);
            }
        },
        all: function(team, cb) {
            db.settings.find({team: team}, cb);
        },
        findByCategory: function(category, cb) {
            db.settings.find({
                metricCategory: category
            }, cb);
        }
    };
})();
