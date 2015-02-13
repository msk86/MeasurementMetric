(function (angular, $) {

    angular.module('metric').factory('MetricDataService', ['$timeout', '$q', function ($timeout, $q) {
        function dataPromise(url) {
            var deferred = $q.defer();
            $.ajax({
                url: url,
                type: 'GET'
            }).success(function (metricData) {
                $timeout(function () {
                    deferred.resolve(metricData);
                });
            }).error(function () {
                $timeout(function () {
                    deferred.reject("An error occurred while get metric data");
                });
            });
            return deferred.promise;
        }

        function metricDataUrl(metricName, timeFrame) {
            return encodeURI("/metrics/" + metricName + '/timeframes/' + timeFrame + '.json');
        }

        return {
            getMetricData: function (metricName, timeFrame) {
                return dataPromise(metricDataUrl(metricName, timeFrame));
            }
        }

    }]);

})(window.angular, window.jQuery);
