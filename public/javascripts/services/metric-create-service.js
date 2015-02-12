(function (angular, $) {

    angular.module('metric').factory('MetricCreateService', ['$timeout', '$q', function ($timeout, $q) {
        function dataPromise(url, data) {
            var params = angular.extend({}, data);

            params.metricType = params.metricType.split(';');
            params.fields = params.fields.split(';');

            var deferred = $q.defer();
            $.ajax({
                url: url,
                type: 'POST',
                data: data
            }).success(function () {
                $timeout(function () {
                    deferred.resolve();
                });
            }).error(function () {
                $timeout(function () {
                    deferred.reject("An error occurred while create metric");
                });
            });
            return deferred.promise;
        }

        function createMetricUrl(metricName) {
            return encodeURI("/metrics/" + metricName);
        }

        return {
            createMetric: function (data) {
                return dataPromise(createMetricUrl(data.metricName), data);
            }
        }

    }]);

})(window.angular, window.jQuery);
