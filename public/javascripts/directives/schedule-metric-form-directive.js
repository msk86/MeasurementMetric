(function (angular) {
    angular.module('metric').directive('scheduleMetricForm',
        [function () {
            return {
                scope: true,
                restrict: 'E',
                templateUrl: '/templates/schedule-metric-form',
                replace: true
            };
        }]);
}(window.angular));
