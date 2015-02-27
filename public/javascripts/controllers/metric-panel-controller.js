(function (angular) {

    angular.module('metric').controller('MetricPanelController',
        ['$scope', 'HelpersService',
            function ($scope, HelpersService) {
                $scope.chartType = 'generalChart';
                $scope.metricName = $scope.settings.metricName;
                $scope.timeFrame = $scope.settings.timeFrame;

                function getFrameRange(timeFrame) {
                    HelpersService.getFrameRange($scope.metricName, timeFrame).then(function(range) {
                        $scope.range = range;
                    });
                }

                $scope.changeTimeFrame = function(timeFrame) {
                    $scope.timeFrame = timeFrame;
                    getFrameRange($scope.timeFrame);
                    $scope.$broadcast('TIME_FRAME_CHANGE', timeFrame);
                };

                $scope.setChartType = function(chartType) {
                    $scope.chartType = chartType;
                };

                getFrameRange($scope.timeFrame);
            }
        ]);

}(window.angular));
