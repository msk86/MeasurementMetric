(function (angular) {
    angular.module('metric').directive('normalMetricForm',
        [function () {
            return {
                scope: true,
                restrict: 'E',
                templateUrl: '/templates/normal-metric-form',
                replace: true
            };
        }]);
}(window.angular));
