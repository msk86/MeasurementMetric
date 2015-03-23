(function (angular) {
    angular.module('metric').factory('MetricSettingsService', ['DataService', function (DataService) {
        function metricSettingsUrl(metricName) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName + "/settings");
        }

        function allSettingsUrl() {
            return encodeURI("/" + TEAM + "/metrics/settings");
        }

        return {
            getSettings: function (metricName) {
                return DataService.get(metricSettingsUrl(metricName));
            },
            allSettings: function() {
                return DataService.get(allSettingsUrl());
            }
        }

    }]);

})(window.angular);
