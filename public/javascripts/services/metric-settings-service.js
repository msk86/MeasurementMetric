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
            return encodeURI("/metrics/" + metricName + "/settings");
        }

        return {
            getSettings: function (metricName) {
                return dataPromise(metricSettingsUrl(metricName));
            }
        }

    }]);

})(window.angular, window.jQuery);
