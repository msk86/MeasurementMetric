(function (angular, $) {

    angular.module('metric').factory('MetricRecordService', ['$timeout', '$q', function ($timeout, $q) {
        function dataPromise(url, data) {
            var deferred = $q.defer();
            $.ajax({
                url: url,
                type: 'POST',
                data: data
            }).success(function (d) {
                $timeout(function () {
                    if(d.error) {
                        deferred.reject(d.error);
                    } else {
                        deferred.resolve();
                    }
                });
            }).error(function () {
                $timeout(function () {
                    deferred.reject("An error occurred while record metric");
                });
            });
            return deferred.promise;
        }

        function recordMetricUrl(metricName) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName);
        }

        return {
            recordMetric: function (data) {
                return dataPromise(recordMetricUrl(data.metricName), data);
            }
        }

    }]);

})(window.angular, window.jQuery);
