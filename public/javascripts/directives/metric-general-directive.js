(function (angular) {
    angular.module('metric').directive('metricGeneral',
        [function () {
            return {
                scope: true,
                restrict: 'E',
                templateUrl: '/templates/metric-general',
                replace: true
            };
        }]);
}(window.angular));
