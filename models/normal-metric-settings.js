var mongojs = require('mongojs');

var databaseUrl = "mydb";
var collections = ["settings"];
var db = mongojs.connect(databaseUrl, collections);

module.exports = (function() {
    function NormalMetricSettings(options) {
        this.createdTime = options.createdTime;
        this.metricCategory = 'normal';
        this.metricName = options.metricName;
        this.metricDesc = options.metricDesc;
        this.metricUnit = options.metricUnit || '';
        this.processMethod = options.processMethod;
        this.metricTypes = options.metricTypes ? (options.metricTypes).split(/[,;:|]/).map(function(t) {return t.trim();}) : [];
        this.fields = options.fields ? (options.fields).split(/[,;:|]/).map(function(f) {return f.trim().replace(/\s/g, '');}) : [];
        this.timeFrame = options.timeFrame;
    }

    NormalMetricSettings.create = function(settings, cb) {
        settings.createdTime = new Date();
        var metricSetting = new NormalMetricSettings(settings);
        db.settings.insert(metricSetting, cb);
    };

    return NormalMetricSettings;
})();
