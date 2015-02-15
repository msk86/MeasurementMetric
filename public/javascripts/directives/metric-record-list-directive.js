(function (angular) {
    angular.module('metric').directive('metricRecordList',
        [function () {
            return {
                scope: true,
                controller: "MetricRecordListController",
                restrict: 'E',
                templateUrl: '/templates/metric-record-list',
                replace: true
            };
        }]);
}(window.angular));
