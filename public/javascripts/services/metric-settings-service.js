(function (angular, $) {

    angular.module('metric').factory('MetricSettingsService', ['$timeout', '$q', function ($timeout, $q) {
        function dataPromise(url) {
            var deferred = $q.defer();
            $.ajax({
                url: url,
                type: 'GET'
            }).success(function (settings) {
                $timeout(function () {
                    deferred.resolve(settings);
                });
            }).error(function () {
                $timeout(function () {
                    deferred.reject("An error occurred while record metric");
                });
            });
            return deferred.promise;
        }

        function metricSettingsUrl(metricName) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName + "/settings");
        }

        function allSettingsUrl() {
            return encodeURI("/" + TEAM + "/metrics/settings");
        }

        return {
            getSettings: function (metricName) {
                return dataPromise(metricSettingsUrl(metricName));
            },
            allSettings: function() {
                return dataPromise(allSettingsUrl());
            }
        }

    }]);

})(window.angular, window.jQuery);
