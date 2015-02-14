(function (angular) {
    angular.module('metric').directive('metricPanel',
        [function () {
            function link($scope, element) {
                $scope.timeFrames = [
                    {display: 'W', frame: 'week'},
                    {display: 'F', frame: 'fortnight'},
                    {display: 'M', frame: 'month'},
                    {display: 'Y', frame: 'year'}
                ];

                $scope.clickTimeFrameFilter = function(timeFrame) {
                    $scope.changeTimeFrame(timeFrame);
                };

                $scope.clickChartType = function(chartType) {
                    $scope.setChartType(chartType);
                };
            }

            return {
                controller: 'MetricPanelController',
                link: link,
                scope: {
                    metricName: '@',
                    theme: '@'
                },
                restrict: 'E',
                templateUrl: '/templates/metric-panel',
                replace: true
            };
        }]);
}(window.angular));
