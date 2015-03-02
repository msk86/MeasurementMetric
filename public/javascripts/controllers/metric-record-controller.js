(function (angular) {

    angular.module('metric').controller('MetricRecordController',
        ['$scope', 'MetricRecordService',
            function ($scope, MetricRecordService) {
                $scope.metric = {};

                var defaultMetricValue = {metricValue: 1};
                if($scope.settings.metricTypes.length) {
                    defaultMetricValue.metricType = $scope.settings.metricTypes[0];
                }
                resetMetric();

                function resetMetric() {
                    $scope.metric = angular.extend({metricName: $scope.metricName}, defaultMetricValue);
                }

                $scope.record = function() {
                    if(!$scope.metric.metricValue) {
                        $scope.metric.metricValue = 1;
                    }
                    return MetricRecordService.recordMetric($scope.metric).then(function() {
                        resetMetric();
                    });
                };
            }
        ]);

}(window.angular));
