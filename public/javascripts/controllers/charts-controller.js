(function (angular, $, moment) {

    angular.module('metric').controller('ChartsController',
        ['$scope', '$timeout', 'ChartDataService',
            function ($scope, $timeout, ChartDataService) {
                $scope.allData = {};

                $scope.trendControls = {
                    dataType: $scope.dataType,
                    intervalType: $scope.intervalType,
                    graphType: $scope.graphType,
                    chartTitle: $scope.chartTitle
                };

                function xDataFor(date) {
                    return moment(date).startOf('year').toDate();
                }

                $scope.$on('LINE_CHART_DATA_CHANGE', function () {
                    $scope.allData = ChartDataService.data();
                });
            }
        ]);

}(window.angular, window.jQuery, window.moment));
