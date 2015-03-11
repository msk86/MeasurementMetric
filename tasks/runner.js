httpHelper = require('../helpers/http-helper');
Metric = require('../models/metric');
_ = require('underscore');

module.exports = (function() {
    function runTask(scheduleMetric, cb) {
        var apiMethod = (scheduleMetric.apiMethod || '').toString().trim().replace(/^function.*?\(/, 'function $x(');
        try {
            eval(apiMethod);
        } catch(e) {}

        if(typeof $x != 'function') {
            return;
        }
        httpHelper.get(scheduleMetric.api, scheduleMetric.username, scheduleMetric.password, function(e, raw) {
            try {
                raw = JSON.parse(raw);
            } catch(e) {}
            Metric.lastRecord(scheduleMetric.team, scheduleMetric.metricName, function(e, lastRecord) {
                if(e) return cb(e);
                var result = null;
                try {
                    result = $x(raw, lastRecord, _);
                } catch(e) {
                    console.log('Script of [' + scheduleMetric.metricName + '] from [' + scheduleMetric.team + '] error.', e.message, e.stack.toString().replace(/\n/g, '\\n'));
                }
                if(result) {
                    (result instanceof Array)? saveResults(result,scheduleMetric, cb) : saveResult(result, scheduleMetric, cb);
                }
            });
        });
    }

    function saveResults(results, scheduleMetric, cb){
        results.forEach(function(result) {
            saveResult(result, scheduleMetric, cb)
        });
    }

    function saveResult(result, scheduleMetric, cb){
        result.team = scheduleMetric.team;
        result.metricName = scheduleMetric.metricName;
        result.metricValue = result.metricValue == null ? 1 : result.metricValue;
        cb(null, result);
    }

    return {
        loadScheduleMetric: runTask
    }
})();

