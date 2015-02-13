(function (angular, $) {
    'use strict';
    angular.module('metric').service('PieChartDataService', ['$rootScope', '$timeout', 'DataService',
        function ($rootScope, $timeout, DataService) {

            var service = this;
            var data;
            service.data = function () {
                // return undefined not {} when data not loaded.
                return data ? $.extend({}, data) : data;
            };
            service.load = function (metric, timeFrame) {
                DataService.pieChartData(metric, timeFrame).then(function (chartData) {
                    data = chartData;
                    $rootScope.$broadcast("PIE_CHART_DATA_CHANGE");
                }, function () {
                    data = {};
                    $rootScope.$broadcast("PIE_CHART_DATA_CHANGE");
                });
            };


            // Ops, write code for test... without this one,
            // we should spy on InvestmentDataService.getProcessedDates before injection,
            // It makes the test too complex and hard to write.
            $timeout(function () {
                service.load();
            });
        }]);
}(window.angular, window.jQuery));
