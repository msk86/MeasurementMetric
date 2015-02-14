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
                }, function () {
                    data = {};
                });
            };
        }]);
}(window.angular, window.jQuery));
