var mongojs = require('mongojs');

var databaseUrl = "mydb";
var collections = ["settings"];
var db = mongojs.connect(databaseUrl, collections);

module.exports = (function() {
    function NormalMetricSettings(options) {
        this.createdTime = typeof(options.createdTime) == 'string' ? new Date(options.createdTime) : options.createdTime;
        this.updatedTime = typeof(options.updatedTime) == 'string' ? new Date(options.updatedTime) : options.updatedTime;
        this.team = options.team;
        this.category = 'normal';
        this.metricName = options.metricName;
        this.metricDesc = options.metricDesc;
        this.metricUnit = options.metricUnit || '';
        this.processMethod = options.processMethod;
        this.metricTypes = options.metricTypes ? (options.metricTypes).replace(/[,;:|]+/g, ';').replace(/^;/, '').replace(/;$/, '').split(/;/).map(function(t) {return t.trim();}) : [];
        this.metricTypeAlias = options.metricTypeAlias;
        this.fields = options.fields ? (options.fields).replace(/[,;:|]+/g, ';').replace(/^;/, '').replace(/;$/, '').split(/;/).map(function(f) {return f.trim().replace(/\s/g, '');}) : [];
        this.stsField = options.stsField;
        this.stsAll = (options.stsAll == undefined || options.stsAll == '') ? 1 : options.stsAll;
        this.timeFrame = options.timeFrame;
        if(this.timeFrame == 'fortnight') {
            var startFrom = new Date();
            if(options.startFrom == 'lastweek') {
                startFrom.setDate(startFrom.getDate() - 7);
            }
            this.startFrom = startFrom;
        }
    }

    NormalMetricSettings.create = function(settings, cb) {
        settings.createdTime = new Date();
        var metricSetting = new NormalMetricSettings(settings);
        db.settings.insert(metricSetting, cb);
    };

    NormalMetricSettings.update = function(id, settings, cb) {
        settings.updatedTime = new Date();
        var metricSetting = new NormalMetricSettings(settings);
        metricSetting._id = mongojs.ObjectId(id);
        db.settings.update({_id: mongojs.ObjectId(id)}, metricSetting, function(e) { cb(e, metricSetting); });
    };

    return NormalMetricSettings;
})();
