(function (angular) {
    angular.module('metric').factory('MetricRecordService', ['DataService', function (DataService) {
        function recordMetricUrl(metricName) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName);
        }

        function deleteMetricUrl(metricName, id) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName + "/" + id);
        }

        return {
            recordMetric: function (data) {
                return DataService.post(recordMetricUrl(data.metricName), data);
            },
            deleteMetric: function(metricName, id) {
                return DataService.delete(deleteMetricUrl(metricName, id));
            }
        }

    }]);

})(window.angular);
