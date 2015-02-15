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

        function frameRangeUrl(timeFrame) {
            return encodeURI("/helpers/range/" + timeFrame);
        }

        return {
            getFrameRange: function (timeFrame) {
                return dataPromise(frameRangeUrl(timeFrame));
            }
        }

    }]);

})(window.angular, window.jQuery);
