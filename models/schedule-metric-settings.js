var mongojs = require('mongojs');
var uuid = require('node-uuid');

var databaseUrl = "mydb";
var collections = ["metric"];
var db = mongojs.connect(databaseUrl, collections);

module.exports = (function() {
    function ScheduleMetricSettings(options) {
        this.id = options.id;
        this.createAt = options.createAt;
        this.metricCategory = 'schedule';
        this.metricName = options.metricName;
        this.metricUnit = options.metricUnit || '';
        this.processMethod = options.processMethod;
        this.metricTypes = options.metricTypes.split(/[,;:|]/);
        this.fields = [];
        this.api = options.api;
        this.username = options.username;
        this.password = options.password;
        this.apiMethod = options.apiMethod;
        this.frequency = options.frequency;
        this.timeFrame = options.timeFrame;
    }

    ScheduleMetricSettings.create = function(settings) {
        settings.id = uuid.v1();
        settings.createdTime = new Date();
        var metricSetting = new ScheduleMetricSettings(settings);
        db.metric.insert({message: metricSetting});
        db.metric.save();
    };

    return ScheduleMetricSettings;
})();
