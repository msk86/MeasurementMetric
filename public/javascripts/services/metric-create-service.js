(function (angular) {

    angular.module('metric').factory('MetricCreateService', ['DataService', function (DataService) {
        function metricUrl(metricName) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName + "/settings");
        }

        function testApiUrl(metricName) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName + "/testApi");
        }

        return {
            createMetric: function (data) {
                return DataService.post(metricUrl(data.metricName), data);
            },
            updateMetric: function (data) {
                return DataService.put(metricUrl(data.metricName), data);
            },
            testApi: function(data) {
                return DataService.post(testApiUrl(data.metricName), data);
            }
        }

    }]);

})(window.angular);
