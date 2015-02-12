(function (angular) {

    angular.module('metric').controller('MetricRecordController',
        ['$scope', 'MetricRecordService', 'MetricSettingsService',
            function ($scope, MetricRecordService, MetricSettingsService) {
                var defaultMetricValue = {};
                $scope.settings = {};
                $scope.metric = {};

                MetricSettingsService.getSettings($scope.metricName).then(function(settings) {
                    $scope.settings = settings;
                    defaultMetricValue.metricType = settings.metricTypes[0];
                    resetMetric();
                });

                function resetMetric() {
                    $scope.metric = angular.extend({}, defaultMetricValue);
                }

                $scope.record = function() {
                    return MetricRecordService.recordMetric($scope.metric).then(function() {
                        resetMetric();
                    });
                };
            }
        ]);

}(window.angular));
