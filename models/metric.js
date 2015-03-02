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
        this.metricValue = parseInt(this.metricValue);
        if(Number.isNaN(this.metricValue)) {
            this.metricValue = 1;
        }

    }

    function reduceData(metricData, processMethod) {
        var processor = {
            total: function(metricData) {
                return _.reduce(metricData, function(m, d) {
                    return m + parseInt(d.metricValue);
                }, 0);
            },
            avg: function(metricData) {
                if(!metricData.length) return 0;
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
                rangeMetrics[dateHelper.formatDate(r.start)] = rangeMetrics[dateHelper.formatDate(r.start)] || [];
                if(m.createdTime.getTime() >= r.start.getTime() && m.createdTime.getTime() <= r.end.getTime()) {
                    rangeMetrics[dateHelper.formatDate(r.start)].push(m);
                }
            });
        });
        return _.map(rangeMetrics, function(metrics, range) {
            return {x: range, y: reduceData(metrics, processMethod)};
        });
    }

    Metric.create = function(team, options, cb) {
        MetricSettings.getInstance(team, options.metricName, function(err, settings) {
            if(err) return cb(err);
            if(!settings) return cb('Metric settings not exist');

            options.createdTime = new Date();
            options.createdDate = dateHelper.formatDate(options.createdTime);
            options.team = team;
            var metric = new Metric(options);
            db.metric.insert(metric, cb);
        });
    };

    Metric.lastRecord = function(team, metricName, cb) {
        db.metric.find({team: team, metricName: metricName}).sort({createdTime: -1}).limit(1, function(e, metrics) {
            if(e) return cb(e);
            cb(null, metrics[0]);
        });
    };

    Metric.recordsInTimeFrame = function(team, metricName, timeFrame, cb) {
        MetricSettings.getInstance(team, metricName, function(err, settings) {
            if(err) return cb(err);
            if(!settings) return cb('No settings');

            var range = dateHelper.getDateRange(dateHelper.standardDay(new Date(), settings.startFrom, timeFrame), timeFrame);
            db.metric.find({
                team: team,
                metricName: metricName,
                createdTime: {$gt: range.start, $lt: range.end}
            }, function(err, metricData) {
                if (err) return cb(err);
                cb(null, metricData);
            });
        });
    };

    Metric.generalInTimeFrame = function(team, metricName, timeFrame, cb) {
        MetricSettings.getInstance(team, metricName, function(err, settings) {
            if(err) return cb(err);
            if(!settings) return cb('No settings');

            var range = dateHelper.getDateRange(dateHelper.standardDay(new Date(), settings.startFrom, timeFrame), timeFrame);
            var processMethod = settings.processMethod;
            db.metric.find({
                team: team,
                metricName: metricName,
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

    Metric.trendsInTimeFrame = function(team, metricName, timeFrame, cb) {
        MetricSettings.getInstance(team, metricName, function(err, settings) {
            if(err) return cb(err);
            if(!settings) return cb('No settings');

            var ranges = dateHelper.sixTrendRanges(dateHelper.standardDay(new Date(), settings.startFrom, timeFrame), timeFrame);
            var processMethod = settings.processMethod;
            db.metric.find({
                team: team,
                metricName: metricName,
                createdTime: {$gt: _.first(ranges).start, $lt: _.last(ranges).end}
            }, function(err, metricData) {
                if(err) return cb(err);
                var value = {};
                if(settings.metricTypes.length) {
                    var grouped = _.groupBy(metricData, function(d) {
                        return d.metricType || '';
                    });
                    _.forEach(grouped, function(gm, g) {
                        value[g] = rangeReduceData(gm, ranges, processMethod);
                    });
                }
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


    Metric.pieInTimeFrame = function(team, metricName, timeFrame, cb) {
        Metric.generalInTimeFrame(team, metricName, timeFrame, function(err, data) {
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
