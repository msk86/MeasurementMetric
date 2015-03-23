(function (angular) {

    angular.module('metric').controller('MetricRecordListController',
        ['$scope', 'MetricDataService', 'MetricRecordService',
            function ($scope, MetricDataService, MetricRecordService) {
                $scope.records = [];

                function getRecords(metricName, timeFrame) {
                    return MetricDataService.getRecords(metricName, timeFrame).then(function(records) {
                        $scope.records = records;
                    });
                }

                $scope.$on("TIME_FRAME_CHANGE", function(e, timeFrame) {
                    getRecords($scope.metricName, timeFrame);
                });

                $scope.$on('REFRESH_SIGNAL', function() {
                    getRecords($scope.metricName, $scope.timeFrame);
                });

                getRecords($scope.metricName, $scope.timeFrame);

                $scope.deleteMetric = function(metricName, id) {
                    return MetricRecordService.deleteMetric(metricName, id).then(function(){
                        getRecords($scope.metricName, $scope.timeFrame);
                    });
                }
            }
        ]);

}(window.angular));
