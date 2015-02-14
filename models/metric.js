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

    function reduceData(metricData, processMethod) {
        var processor = {
            total: function(metricData) {
                return _.reduce(metricData, function(m, d) {
                    return m + parseInt(d.metricValue);
                }, 0);
            },
            avg: function(metricData) {
                return Math.floor(this.total(metricData) / metricData.length);
            },
            max: function(metricData) {
                return _.max(metricData, function(d) {
                    return parseInt(d.metricValue);
                });
            },
            min: function(metricData) {
                return _.min(metricData, function(d) {
                    return parseInt(d.metricValue);
                });
            }
        };

        return processor[processMethod](metricData);
    }

    function rangeReduceData(metricData, ranges, processMethod) {
        var rangeMetrics = {};
        _.forEach(metricData, function(m) {
            _.forEach(ranges, function(r) {
                rangeMetrics[dateHelper.formatDate(r.end)] = rangeMetrics[dateHelper.formatDate(r.end)] || [];
                if(m.createdTime.getTime() >= r.start.getTime() && m.createdTime.getTime() <= r.end.getTime()) {
                    rangeMetrics[dateHelper.formatDate(r.end)].push(m);
                }
            });
        });
        return _.map(rangeMetrics, function(metrics, range) {
            return {x: range, y: reduceData(metrics, processMethod)};
        });
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
            var processMethod = settings.processMethod;
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
                    var groupValue = reduceData(groupData, processMethod);
                    if(group) {
                        memo[group] = groupValue;
                    }
                    return memo;
                }, {});

                value.all = reduceData(metricData, processMethod);

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

    Metric.trendsInTimeFrame = function(metricName, timeFrame, cb) {
        var ranges = dateHelper.sixTrendRanges(new Date(), timeFrame);
        MetricSettings.getInstance(metricName, function(err, settings) {
            if(err) return cb(err);
            if(!settings) return cb('No settings');
            var processMethod = settings.processMethod;
            db.metric.find({
                metricName: metricName,
                metric: true,
                createdTime: {$gt: _.first(ranges).start, $lt: _.last(ranges).end}
            }, function(err, metricData) {
                if(err) return cb(err);
                var grouped = _.groupBy(metricData, function(d) {
                    return d.metricType || '';
                });

                var value = {};
                _.forEach(grouped, function(gm, g) {
                    value[g] = rangeReduceData(gm, ranges, processMethod);
                });

                value.all = rangeReduceData(metricData, ranges, processMethod);

                var data = {
                    metricName: metricName,
                    metricDesc: settings.metricDesc,
                    timeFrame: timeFrame,
                    trends: value
                };

                cb(null, data);
            });
        });
    };


    Metric.pieInTimeFrame = function(metricName, timeFrame, cb) {
        Metric.loadInTimeFrame(metricName, timeFrame, function(err, data) {
            if(err) return cb(err);
            data.pie = {};
            _.forEach(data.value, function(v, type) {
                data.pie[type] = [{x: "", y: v}];
            });

            cb(null, data);
        });
    };


    return Metric;
})();
