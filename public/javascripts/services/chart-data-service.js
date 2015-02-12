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
            service.load = function () {
                var apiData = {
                    "metricName": "Stories",
                    "metricDesc": "Finished stories in current iteration",
                    "timeFrame": "week",
                    "trends": {
                        "all": [
                            {"x": "2015-02-09", "y": 0, "date": "2015-02-09"},
                            {"x": "2015-02-10", "y": 2, "date": "2015-02-10"},
                            {"x": "2015-02-11", "y": 3, "date": "2015-02-11"},
                            {"x": "2015-02-12", "y": 5, "date": "2015-02-12"},
                            {"x": "2015-02-13", "y": 8, "date": "2015-02-13"},
                            {"x": "2015-02-14", "y": 8, "date": "2015-02-14"},
                            {"x": "2015-02-15", "y": 8, "date": "2015-02-15"}
                        ],
                        "userStory": [
                            {"x": "2015-02-09", "y": 0, "date": "2015-02-09"},
                            {"x": "2015-02-10", "y": 2, "date": "2015-02-10"},
                            {"x": "2015-02-11", "y": 2, "date": "2015-02-11"},
                            {"x": "2015-02-12", "y": 4, "date": "2015-02-12"},
                            {"x": "2015-02-13", "y": 5, "date": "2015-02-13"},
                            {"x": "2015-02-14", "y": 5, "date": "2015-02-14"},
                            {"x": "2015-02-15", "y": 5, "date": "2015-02-15"}
                        ],
                        "bug": [
                            {"x":"2015-02-09", "y": 0, "date": "2015-02-09"},
                            {"x":"2015-02-10", "y": 0, "date": "2015-02-10"},
                            {"x":"2015-02-11", "y": 1, "date": "2015-02-11"},
                            {"x":"2015-02-12", "y": 1, "date": "2015-02-12"},
                            {"x":"2015-02-13", "y": 2, "date": "2015-02-13"},
                            {"x":"2015-02-14", "y": 2, "date": "2015-02-14"},
                            {"x":"2015-02-15", "y": 2, "date": "2015-02-15"}
                        ],
                        "techTask": [
                            {"x": "2015-02-09","y": 0, "date": "2015-02-09"},
                            {"x": "2015-02-10","y": 0, "date": "2015-02-10"},
                            {"x": "2015-02-11","y": 0, "date": "2015-02-11"},
                            {"x": "2015-02-12","y": 0, "date": "2015-02-12"},
                            {"x": "2015-02-13","y": 1, "date": "2015-02-13"},
                            {"x": "2015-02-14","y": 1, "date": "2015-02-14"},
                            {"x": "2015-02-15","y": 1, "date": "2015-02-15"}
                        ]
                    }
                };
                $rootScope.$broadcast("LINE_CHART_DATA_CHANGE", apiData);
                return apiData;

                DataService.lineChartData().then(function (lineChartData) {
                    data = lineChartData;
                    $rootScope.$broadcast("LINE_CHART_DATA_CHANGE");
                }, function () {
                    data = {};
                    $rootScope.$broadcast("LINE_CHART_DATA_CHANGE");
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
