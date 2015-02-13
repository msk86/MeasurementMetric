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

        function lineChartUrl(metric, timeFrame) {
            return encodeURI(HOST + "/metrics/"+metric+"/timeframes/"+timeFrame+"/trends.json");
        }

        function pieChartUrl(metric, timeFrame) {
            return encodeURI(HOST + "/metrics/"+metric+"/timeframes/"+timeFrame+"/pie.json");
        }

        return {
            lineChartData: function lineChartData(metric, timeFrame) {
                return dataPromise(lineChartUrl(metric, timeFrame));
            },
            pieChartData: function pieChartData(metric, timeFrame) {
                return dataPromise(pieChartUrl(metric, timeFrame));
            }
        }

    }]);

})(window.angular, window.jQuery);
