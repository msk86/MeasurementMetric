httpHelper = require('../helpers/http-helper');
Metric = require('../models/metric');
_ = require('underscore');

module.exports = (function() {
    function runTask(scheduleMetric, cb) {
        var $x = gen$x(scheduleMetric.apiMethod);
        if(typeof $x != 'function') {
            return cb('Api Method is not a function.');
        }
        httpHelper.get(scheduleMetric.api, scheduleMetric.username, scheduleMetric.password, function(e, raw) {
            if(e) {return cb(e);}
            try {
                raw = JSON.parse(raw);
            } catch(e) {}
            Metric.lastRecord(scheduleMetric.team, scheduleMetric.metricName, function(e, lastRecord) {
                if(e) return cb(e);
                run(scheduleMetric, $x, raw, lastRecord, _, cb);
            });
        });
    }

    function testTask(scheduleMetric, cb) {
        var $x = gen$x(scheduleMetric.apiMethod);
        if(typeof $x != 'function') {
            return cb('Api Method is not a function.');
        }
        httpHelper.get(scheduleMetric.api, scheduleMetric.username, scheduleMetric.password, function(e, raw) {
            if(e) {return cb(e);}
            try {
                raw = JSON.parse(raw);
            } catch(e) {}
            run(scheduleMetric, $x, raw, null, _, cb);
        });
    }

    function gen$x(apiMethod) {
        var apiMethod = (apiMethod || '').toString().trim().replace(/^function.*?\(/, 'function $x(');
        try {
            eval(apiMethod);
        } catch(e) {}
        return $x;
    }

    function run(scheduleMetric, $x, raw, lastRecord, _, cb) {
        var results = null;
        try {
            results = $x(raw, lastRecord, _);
        } catch(e) {
            cb('Script of [' + scheduleMetric.metricName + '] from [' + scheduleMetric.team + '] error.', e.stack.toString().replace(/\n/g, '\\n'));
        }
        if(results) {
            if(!(results instanceof Array)) {
                results = [results];
            }
            setMetricProp(results, scheduleMetric);
            cb(null, results);
        }
    }

    function setMetricProp(results, scheduleMetric) {
        results.forEach(function(result) {
            result.team = scheduleMetric.team;
            result.metricName = scheduleMetric.metricName;
            result.metricValue = result.metricValue == null ? 1 : result.metricValue;
        });
    }

    return {
        loadScheduleMetric: runTask,
        testTask: testTask
    }
})();

