(function (angular) {
    angular.module('metric').directive('metricChartGeneral',
        [function () {
            return {
                scope: true,
                controller: 'MetricChartGeneralController',
                restrict: 'E',
                templateUrl: '/templates/metric-chart-general',
                replace: true
            };
        }]);
}(window.angular));
