(function (angular, $) {

    angular.module('metric').factory('DataService', ['$timeout', '$q', function ($timeout, $q) {

        var HOST = 'http://localhost:3000';

        function dataPromise(url) {
            var deferred = $q.defer();
            $.ajax({
                url: url,
                dataType: 'jsonp',
                timeout: 5000
            }).success(function (data) {
                setTimeout(function () {
                    deferred.resolve(data);
                }, 0);
            }).error(function () {
                setTimeout(function () {
                    deferred.reject("An error occurred while fetching data");
                }, 0);
            });
            return deferred.promise;
        }

        function lineChartUrl() {
            return encodeURI(HOST + "/metrics/story/timeframes/week/trends.json");
        }

        return {
            lineChartData: function lineChartData() {
                return dataPromise(lineChartUrl());
            }
        }

    }]);

})(window.angular, window.jQuery);