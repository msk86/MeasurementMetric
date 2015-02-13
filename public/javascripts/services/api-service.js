(function (angular, $) {

    angular.module('metric').factory('DataService', ['$timeout', '$q', function ($timeout, $q) {

        var HOST = 'http://localhost:4000';

        function dataPromise(url) {
            var deferred = $q.defer();
            $.ajax({
                url: url,
                dataType: 'json',
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

        function pieChartUrl() {
            return encodeURI(HOST + "/metrics/story/timeframes/week/pie.json");
        }

        return {
            lineChartData: function lineChartData() {
                return dataPromise(lineChartUrl());
            },
            pieChartData: function pieChartData() {
                return dataPromise(pieChartUrl());
            }
        }

    }]);

})(window.angular, window.jQuery);