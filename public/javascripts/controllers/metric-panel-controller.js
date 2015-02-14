(function (angular) {

    angular.module('metric').controller('MetricPanelController',
        ['$scope', '$timeout', 'MetricDataService', 'MetricSettingsService',
            function ($scope, $timeout, MetricDataService, MetricSettingsService) {
                $scope.chartType = 'general';

                MetricSettingsService.getSettings($scope.metricName).then(function(settings) {
                    $scope.timeFrame = settings.timeFrame;
                    $scope.metricDesc = 'Production issue average recovery time.';
                    $scope.settings = settings;
                    getMetricData();
                });

                function getMetricData() {
                    MetricDataService.getMetricData($scope.metricName, $scope.timeFrame).then(function(metric) {
                        $scope.metric = metric;
                    });
                }

                $scope.changeTimeFrame = function(timeFrame) {
                    $scope.timeFrame = timeFrame;
                    $scope.$broadcast('TIME_FRAME_CHANGE', timeFrame);
                };

                $scope.$on('TIME_FRAME_CHANGE', function() {
                    getMetricData();
                });

                $scope.setChartType = function(chartType) {
                    $scope.chartType = chartType;
                };
            }
        ]);

}(window.angular));
