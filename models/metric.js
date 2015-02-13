var mongojs = require('mongojs');

var databaseUrl = "mydb";
var collections = ["metric"];
var db = mongojs.connect(databaseUrl, collections);

var MetricSettings = require('../models/metric-settings');
var dateHelper = require('../helpers/date-helper');

var _ = require('underscore');

module.exports = (function() {
    function Metric(options) {
        _.extend(this, options);
        this.metric = true;
    }

    Metric.create = function(options) {
        options.createdTime = new Date();
        var metric = new Metric(options);
        db.metric.insert(metric);
    };

    Metric.loadInTimeFrame = function(metricName, timeFrame, cb) {
        var range = dateHelper.getDateRange(new Date(), timeFrame);
        MetricSettings.getInstance(metricName, function(err, settings) {
            if(err) return cb(err);
            if(!settings) return cb('No settings');
            db.metric.find({
                metricName: metricName,
                metric: true,
                createdTime: {$gt: range.start, $lt: range.end}
            }, function(err, metricData) {
                if(err) return cb(err);
                var grouped = _.groupBy(metricData, function(d) {
                    return d.metricType || '';
                });

                var value = _.reduce(grouped, function(memo, groupData, group) {
                    var groupValue = _.reduce(groupData, function(m, d) {return m + parseInt(d.metricValue);}, 0);
                    if(group) {
                        memo[group] = groupValue;
                    }
                    return memo;
                }, {});

                value.all = _.reduce(metricData, function(m, d) {
                    return m + parseInt(d.metricValue);
                }, 0);

                var data = {
                    metricName: metricName,
                    metricDesc: settings.metricDesc,
                    timeFrame: timeFrame,
                    timeRange: {
                        start: dateHelper.formatDate(range.start),
                        end: dateHelper.formatDate(range.end)
                    },
                    value: value
                };

                cb(null, data);
            });
        });
    };

    Metric.pieInTimeFrame = function(metricName, timeFrame, cb) {
        Metric.loadInTimeFrame(metricName, timeFrame, function(err, data) {
            if(err) return cb(err);
            console.log(data);
            data.pie = _.reduce(data.value, function(m, v, type) {
                m[type] = [{x: "", y: v}];
            }, {});
            cb(null, data);
        });
    };


    return Metric;
})();
