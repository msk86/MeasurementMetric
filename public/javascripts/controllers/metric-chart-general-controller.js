(function (angular) {

    angular.module('metric').controller('MetricChartGeneralController',
        ['$scope', '$timeout', 'MetricDataService',
            function ($scope, $timeout, MetricDataService) {

                function getGeneralData(metricName, timeFrame) {
                    MetricDataService.getGeneralData(metricName, timeFrame).then(function(metric) {
                        $scope.metric = metric;
                    });
                }

                $scope.$on('TIME_FRAME_CHANGE', function(e, timeFrame) {
                    getGeneralData($scope.metricName, timeFrame);
                });

                $scope.$on('REFRESH_SIGNAL', function() {
                    getGeneralData($scope.metricName, $scope.timeFrame);
                });

                getGeneralData($scope.metricName, $scope.timeFrame);
            }
        ]);

}(window.angular));
