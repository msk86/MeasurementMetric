(function (angular) {

    angular.module('metric').controller('MetricPanelController',
        ['$scope',
            function ($scope) {
                $scope.chartType = 'generalChart';
                $scope.metricName = $scope.settings.metricName;
                $scope.timeFrame = $scope.settings.timeFrame;

                $scope.changeTimeFrame = function(timeFrame) {
                    $scope.timeFrame = timeFrame;
                    $scope.$broadcast('TIME_FRAME_CHANGE', timeFrame);
                };

                $scope.setChartType = function(chartType) {
                    $scope.chartType = chartType;
                };
            }
        ]);

}(window.angular));
