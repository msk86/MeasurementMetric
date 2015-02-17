var mongojs = require('mongojs');

var databaseUrl = "mydb";
var collections = ["metric"];
var db = mongojs.connect(databaseUrl, collections);

module.exports = (function() {
    function ScheduleMetricSettings(options) {
        this.settings = true;
        this.createdTime = options.createdTime;
        this.metricCategory = 'schedule';
        this.metricName = options.metricName;
        this.metricDesc = options.metricDesc;
        this.metricUnit = options.metricUnit || '';
        this.processMethod = options.processMethod;
        this.metricTypes = options.metricTypes ? (options.metricTypes).split(/[,;:|]/).map(function(t) {return t.trim();}) : [];
        this.fields = options.fields ? (options.fields).split(/[,;:|]/).map(function(f) {return f.trim().replace(/\s/g, '');}) : [];
        this.api = options.api;
        this.username = options.username;
        this.password = options.password;
        this.apiMethod = options.apiMethod;
        this.frequency = options.frequency;
        this.timeFrame = options.timeFrame;
    }

    ScheduleMetricSettings.create = function(settings) {
        settings.createdTime = new Date();
        var metricSetting = new ScheduleMetricSettings(settings);
        db.metric.insert(metricSetting);
    };

    return ScheduleMetricSettings;
})();
