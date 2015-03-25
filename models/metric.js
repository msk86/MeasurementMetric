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

    Metric.create = function(team, options, cb) {
        MetricSettings.getInstance(team, options.metricName, function(err, settings) {
            if(err) return cb(err);
            if (!settings) return cb('No settings for team:[' + team + '] and metricName:[' + metricName + ']');

            options.createdTime = new Date();
            options.createdDate = dateHelper.formatDate(options.createdTime);
            options.team = team;
            var metric = new Metric(options);
            db.metric.insert(metric, cb);
        });
    };

    Metric.createInBatch = function(team, metricName, optionArray, cb) {
        MetricSettings.getInstance(team, metricName, function(err, settings) {
            if (err) return cb(err);
            if (!settings) return cb('No settings for team:[' + team + '] and metricName:[' + metricName + ']');

            var metrics = optionArray.map(function (options) {
                options.createdTime = new Date();
                options.createdDate = dateHelper.formatDate(options.createdTime);
                options.team = team;
                return new Metric(options);
            });

            db.metric.insert(metrics, cb);
        });
    };

    Metric.remove = function(team, metricName, id, cb) {
        db.metric.remove({team: team, metricName: metricName, _id: mongojs.ObjectId(id)}, cb);
    };

    Metric.lastRecord = function(team, metricName, cb) {
        MetricSettings.getInstance(team, metricName, function(err, settings) {
            if (err) return cb(err);
            if (!settings) return cb('No settings for team:[' + team + '] and metricName:[' + metricName + ']');

            db.metric.find({
                team: team, metricName: metricName
            }).sort({createdTime: -1}).limit(1, function(e, metrics) {
                if(e) return cb(e);
                cb(null, metrics[0]);
            });
        });
    };

    Metric.recordsInTimeFrame = function(team, metricName, timeFrame, cb) {
        MetricSettings.getInstance(team, metricName, function(err, settings) {
            if(err) return cb(err);
            if (!settings) return cb('No settings for team:[' + team + '] and metricName:[' + metricName + ']');

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
                }).metricValue;
            },
            min: function(metricData) {
                return _.min(metricData, function(d) {
                    return parseInt(d.metricValue);
                }).metricValue;
            },
            last: function(metricData) {
                return (_.last(metricData) || {}).metricValue;
            }
        };

        return processor[processMethod](metricData) || 0;
    }

    function rangeReduceData(metricData, processMethod, ranges) {
        var rangeMetrics = {};
        _.forEach(ranges, function(r) {
            rangeMetrics[dateHelper.formatDate(r.start)] = [];
            _.forEach(metricData, function(m) {
                if(m.createdTime.getTime() >= r.start.getTime() && m.createdTime.getTime() <= r.end.getTime()) {
                    rangeMetrics[dateHelper.formatDate(r.start)].push(m);
                }
            });
            rangeMetrics[dateHelper.formatDate(r.start)] = reduceData(rangeMetrics[dateHelper.formatDate(r.start)], processMethod)
        });
        return rangeMetrics;
    }

    var CHART = {
        general : {
            reducer: reduceData,
            formatter: function (metrics) {
                return metrics;
            }
        },
        trends : {
            reducer: rangeReduceData,
            formatter: function (metrics) {
                return _.map(metrics, function(m, range) {
                    return {x: range, y: m};
                });
            }
        },
        pie : {
            reducer: reduceData,
            formatter: function (metrics) {
                return [{x: "", y: metrics}];
            }
        }
    };


    Metric.generalInTimeFrame = function(team, metricName, timeFrame, cb) {
        MetricSettings.getInstance(team, metricName, function(err, settings) {
            if(err) return cb(err);
            if (!settings) return cb('No settings for team:[' + team + '] and metricName:[' + metricName + ']');

            var range = dateHelper.getDateRange(dateHelper.standardDay(new Date(), settings.startFrom, timeFrame), timeFrame);

            processData('general', settings, range.start, range.end, range, function(err, value) {
                if(err) return cb(err);
                cb(null, {
                    metricName: metricName,
                    metricDesc: settings.metricDesc,
                    timeFrame: timeFrame,
                    timeRange: {
                        start: dateHelper.formatDate(range.start),
                        end: dateHelper.formatDate(range.end)
                    },
                    value: value
                });
            });
        });
    };

    Metric.trendsInTimeFrame = function(team, metricName, timeFrame, cb) {
        MetricSettings.getInstance(team, metricName, function(err, settings) {
            if(err) return cb(err);
            if (!settings) return cb('No settings for team:[' + team + '] and metricName:[' + metricName + ']');

            var ranges = dateHelper.sixTrendRanges(dateHelper.standardDay(new Date(), settings.startFrom, timeFrame), timeFrame);

            processData('trends', settings, _.first(ranges).start, _.last(ranges).end, ranges, function(err, value) {
                if(err) return cb(err);
                cb(null, {
                    metricName: metricName,
                    metricDesc: settings.metricDesc,
                    timeFrame: timeFrame,
                    trends: value
                });
            });
        });
    };


    Metric.pieInTimeFrame = function(team, metricName, timeFrame, cb) {
        MetricSettings.getInstance(team, metricName, function(err, settings) {
            if(err) return cb(err);
            if (!settings) return cb('No settings for team:[' + team + '] and metricName:[' + metricName + ']');

            var range = dateHelper.getDateRange(dateHelper.standardDay(new Date(), settings.startFrom, timeFrame), timeFrame);

            processData('pie', settings, range.start, range.end, range, function(err, value) {
                if(err) return cb(err);
                cb(null, {
                    metricName: metricName,
                    metricDesc: settings.metricDesc,
                    timeFrame: timeFrame,
                    timeRange: {
                        start: dateHelper.formatDate(range.start),
                        end: dateHelper.formatDate(range.end)
                    },
                    pie: value
                });
            });
        });
    };

    function dataNeedGroup(settings) {
        return settings.metricTypes.length || settings.stsField;
    }

    function isShowAll(chart, settings) {
        if(chart == 'general') return true;
        if(settings.metricTypes.length || settings.stsField) {
            return parseInt(settings.stsAll);
        } else {
            return true;
        }
    }

    function processData(chart, settings, createdAfter, createdBefore, ranges, cb) {
        var processMethod = settings.processMethod;

        var reducer = CHART[chart].reducer;
        var formatter = CHART[chart].formatter;

        db.metric.find({
            team: settings.team,
            metricName: settings.metricName,
            createdTime: {$gt: createdAfter, $lt: createdBefore}
        }, function(err, metricData) {
            if(err) return cb(err);
            var value = {};
            if(dataNeedGroup(settings)) {
                var grouped = _.groupBy(metricData, function(d) {
                    return d.metricType || d[settings.stsField] || '';
                });
                _.forEach(grouped, function(gm, g) {
                    value[g] = formatter(reducer(gm, processMethod, ranges));
                });
            }
            if(isShowAll(chart, settings)) {
                value.all = formatter(reducer(metricData, processMethod, ranges));
            }

            cb(null, value);
        });
    }

    return Metric;
})();
