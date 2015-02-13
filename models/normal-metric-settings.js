var mongojs = require('mongojs');

var databaseUrl = "mydb";
var collections = ["metric"];
var db = mongojs.connect(databaseUrl, collections);

module.exports = (function() {
    function NormalMetricSettings(options) {
        this.createAt = options.createAt;
        this.metricCategory = 'normal';
        this.metricName = options.metricName;
        this.metricUnit = options.metricUnit || '';
        this.processMethod = options.processMethod;
        this.metricTypes = options.metricTypes.split(/[,;:|]/);
        this.fields = options.fields.split(/[,;:|]/);
        this.timeFrame = options.timeFrame;
    }

    NormalMetricSettings.create = function(settings) {
        settings.createdTime = new Date();
        var metricSetting = new NormalMetricSettings(settings);
        db.metric.insert({message: metricSetting});
    };

    return NormalMetricSettings;
})();
