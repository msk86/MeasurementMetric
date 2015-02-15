(function (angular) {

    angular.module('metric').controller('MetricRecordListController',
        ['$scope', 'MetricDataService',
            function ($scope, MetricDataService) {
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
            }
        ]);

}(window.angular));
