(function (angular) {

    angular.module('metric').controller('MetricPanelController',
        ['$scope', 'MetricDataService', 'MetricSettingsService',
            function ($scope, MetricDataService, MetricSettingsService) {
                $scope.chartType = 'general';
                MetricSettingsService.getSettings($scope.metricName).then(function(settings) {
                    $scope.timeFrame = settings.timeFrame;
                    $scope.metricDesc = 'Production issue average recovery time.';
                    getMetricData();
                });

                function getMetricData() {
                    MetricDataService.getMetricData($scope.metricName, $scope.timeFrame).then(function(metric) {
                        $scope.metric = metric;
                    });
                }

                $scope.changeTimeFrame = function(timeFrame) {
                    $scope.timeFrame = timeFrame;

                    getMetricData();
                };

                $scope.setChartType = function(chartType) {
                    $scope.chartType = chartType;
                };
            }
        ]);

}(window.angular));
