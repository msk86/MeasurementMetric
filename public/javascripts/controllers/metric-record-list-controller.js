(function (angular, moment) {

    angular.module('metric').controller('MetricRecordListController',
        ['$scope', 'MetricDataService',
            function ($scope, MetricDataService) {
                function getRecords(metricName, timeFrame) {
                    return MetricDataService.getRecords(metricName, timeFrame).then(function(records) {
                        $scope.records = records;
                    });
                }

                getRecords($scope.metricName, $scope.timeFrame);

                $scope.$on("TIME_FRAME_CHANGE", function(e, timeFrame) {
                    getRecords($scope.metricName, timeFrame);
                });
            }
        ]);

}(window.angular, window.moment));
