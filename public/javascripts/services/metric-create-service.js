(function (angular, $) {

    angular.module('metric').factory('MetricCreateService', ['$timeout', '$q', function ($timeout, $q) {
        function dataPromise(url, data, method) {
            var deferred = $q.defer();
            $.ajax({
                url: url,
                type: method,
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
                    deferred.reject("An error occurred while create metric");
                });
            });
            return deferred.promise;
        }

        function metricUrl(metricName) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName + "/settings");
        }

        return {
            createMetric: function (data) {
                return dataPromise(metricUrl(data.metricName), data, 'POST');
            },
            updateMetric: function (data) {
                return dataPromise(metricUrl(data.metricName), data, 'PUT');
            }
        }

    }]);

})(window.angular, window.jQuery);
