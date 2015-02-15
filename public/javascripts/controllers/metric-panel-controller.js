(function (angular) {

    angular.module('metric').controller('MetricPanelController',
        ['$scope', '$timeout', 'MetricDataService',
            function ($scope, $timeout, MetricDataService) {
                $scope.chartType = 'generalChart';
                $scope.metricName = $scope.settings.metricName;
                $scope.timeFrame = $scope.settings.timeFrame;

                function getGeneralData() {
                    MetricDataService.getGeneralData($scope.metricName, $scope.timeFrame).then(function(metric) {
                        $scope.metric = metric;
                    });
                }

                getGeneralData();

                $scope.changeTimeFrame = function(timeFrame) {
                    $scope.timeFrame = timeFrame;
                    $scope.$broadcast('TIME_FRAME_CHANGE', timeFrame);
                };

                $scope.$on('TIME_FRAME_CHANGE', function() {
                    getGeneralData();
                });

                $scope.setChartType = function(chartType) {
                    $scope.chartType = chartType;
                };
            }
        ]);

}(window.angular));
