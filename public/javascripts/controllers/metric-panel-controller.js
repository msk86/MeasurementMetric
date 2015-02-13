(function (angular) {

    angular.module('metric').controller('MetricPanelController',
        ['$scope', 'MetricDataService', 'MetricSettingsService',
            function ($scope, MetricDataService, MetricSettingsService) {
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
                }
            }
        ]);

}(window.angular));
