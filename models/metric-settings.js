NormalMetricSettings = require('../models/normal-metric-settings');
ScheduleMetricSettings = require('../models/schedule-metric-settings');

module.exports = (function() {
    return {
        getInstance: function(metricName) {
            // TODO get setting options from db
            var settingOptions = {};

            if(settingOptions.category == 'schedule') {
                return new ScheduleMetricSettings(settingOptions)
            } else {
                return new NormalMetricSettings(settingOptions);
            }
        },
        create: function(metricCategory, settings) {
            if(settings.category == 'schedule') {
                ScheduleMetricSettings.create(settings);
            } else {
                NormalMetricSettings.create(settings);
            }
        }
    };
})();
