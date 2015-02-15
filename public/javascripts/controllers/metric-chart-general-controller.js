(function (angular, $, moment) {

    angular.module('metric').controller('MetricChartGeneralController',
        ['$scope', '$timeout', 'MetricDataService',
            function ($scope, $timeout, MetricDataService) {

                function getGeneralData() {
                    MetricDataService.getGeneralData($scope.metricName, $scope.timeFrame).then(function(metric) {
                        $scope.metric = metric;
                    });
                }

                getGeneralData();

                $scope.$on('TIME_FRAME_CHANGE', function() {
                    getGeneralData();
                });
            }
        ]);

}(window.angular, window.jQuery, window.moment));
