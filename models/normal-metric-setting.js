module.exports = (function() {
    function NormalMetricSetting(options) {
        this.metricCategory = 'normal';
        this.metricName = options.metricName;
        this.metricUnit = options.metricUnit || '';
        this.processMethod = options.processMethod;
        this.metricTypes = options.metricTypes.split(/[,;:|]/);
        this.fields = options.fields.split(/[,;:|]/);
        this.timeFrame = options.timeFrame;
    }

    return NormalMetricSetting;
})();
