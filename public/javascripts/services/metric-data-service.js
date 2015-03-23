(function (angular, $) {

    angular.module('metric').factory('MetricDataService', ['DataService', function (DataService) {
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

        function generalDataUrl(metricName, timeFrame) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName + '/timeframes/' + timeFrame + '/general');
        }

        function trendsDataUrl(metricName, timeFrame) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName + "/timeframes/" + timeFrame + "/trends");
        }

        function pieDataUrl(metricName, timeFrame) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName + "/timeframes/" + timeFrame + "/pie");
        }

        function recordsUrl(metricName, timeFrame) {
            return encodeURI("/" + TEAM + "/metrics/" + metricName + "/timeframes/" + timeFrame);
        }

        return {
            getGeneralData: function (metricName, timeFrame) {
                return DataService.get(generalDataUrl(metricName, timeFrame));
            },
            getTrendsData: function (metricName, timeFrame) {
                return DataService.get(trendsDataUrl(metricName, timeFrame));
            },
            getPieData: function (metricName, timeFrame) {
                return DataService.get(pieDataUrl(metricName, timeFrame));
            },
            getRecords: function(metricName, timeFrame) {
                return DataService.get(recordsUrl(metricName, timeFrame));
            }
        }

    }]);

})(window.angular, window.jQuery);
