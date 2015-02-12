NormalMetricSetting = require('../models/normal-metric-setting');
ScheduleMetricSetting = require('../models/schedule-metric-setting');

module.exports = (function() {
    return {
        getInstance: function(metricName) {
            // TODO get setting options from db
            var settingOptions = {};

            if(settingOptions.category == 'schedule') {
                return new ScheduleMetricSetting(settingOptions)
            } else {
                return new NormalMetricSetting(settingOptions);
            }
        }
    };
})();
