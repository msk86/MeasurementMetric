(function (angular, $) {
    'use strict';
    angular.module('metric').service('ChartDataService', ['$rootScope', '$timeout', 'DataService',
        function ($rootScope, $timeout, DataService) {

            var service = this;
            var data;
            service.data = function () {
                // return undefined not {} when data not loaded.
                return data ? $.extend({}, data) : data;
            };
            service.load = function (metric, timeFrame) {
                DataService.lineChartData(metric, timeFrame).then(function (lineChartData) {
                    data = lineChartData;
                    $rootScope.$broadcast("LINE_CHART_DATA_CHANGE");
                }, function () {
                    data = {};
                    $rootScope.$broadcast("LINE_CHART_DATA_CHANGE");
                });
            };
        }]);
}(window.angular, window.jQuery));
