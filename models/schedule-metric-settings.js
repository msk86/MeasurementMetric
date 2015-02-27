var mongojs = require('mongojs');

var databaseUrl = "mydb";
var collections = ["settings"];
var db = mongojs.connect(databaseUrl, collections);

module.exports = (function() {
    function ScheduleMetricSettings(options) {
        this.createdTime = options.createdTime;
        this.team = options.team;
        this.category = 'schedule';
        this.metricName = options.metricName;
        this.metricDesc = options.metricDesc;
        this.metricUnit = options.metricUnit || '';
        this.processMethod = options.processMethod;
        this.metricTypes = options.metricTypes ? (options.metricTypes).replace(/[,;:|]+/g, ';').replace(/^;/, '').replace(/;$/, '').split(/;/).map(function(t) {return t.trim();}) : [];
        this.fields = options.fields ? (options.fields).replace(/[,;:|]+/g, ';').replace(/^;/, '').replace(/;$/, '').split(/;/).map(function(f) {return f.trim().replace(/\s/g, '');}) : [];
        this.api = options.api;
        this.username = options.username;
        this.password = options.password;
        this.apiMethod = options.apiMethod;
        this.frequency = options.frequency;
        this.timeFrame = options.timeFrame;
        if(this.timeFrame == 'fortnight') {
            var startFrom = new Date();
            if(options.startFrom == 'lastweek') {
                startFrom.setDate(startFrom.getDate() - 7);
            }
            this.startFrom = startFrom;
        }
    }

    ScheduleMetricSettings.create = function(settings, cb) {
        settings.createdTime = new Date();
        var metricSetting = new ScheduleMetricSettings(settings);
        db.settings.insert(metricSetting, cb);
    };

    return ScheduleMetricSettings;
})();
