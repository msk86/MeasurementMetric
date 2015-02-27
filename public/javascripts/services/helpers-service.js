(function (angular, $) {

    angular.module('metric').factory('HelpersService', ['$timeout', '$q', function ($timeout, $q) {
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
                    deferred.reject("An error occurred while get helpers");
                });
            });
            return deferred.promise;
        }

        function frameRangeUrl(metricName, timeFrame) {
            return encodeURI("/helpers/range/teams/" + TEAM + "/metrics/" + metricName + "/timeframes/" + timeFrame);
        }

        return {
            getFrameRange: function (metricName, timeFrame) {
                return dataPromise(frameRangeUrl(metricName, timeFrame));
            }
        }

    }]);

})(window.angular, window.jQuery);
