(function (angular) {
    angular.module('metric').directive('metricCreateForm',
        [function () {
            function link($scope, element) {
                $scope.categories = ['normal', 'schedule'];
                $scope.timeFrames = ['Day', 'Week', 'Fortnight', 'Month'];
            }

            return {
                link: link,
                scope: true,
                controller: 'MetricCreateController',
                restrict: 'E',
                templateUrl: '/templates/metric-create-form',
                replace: true
            };
        }]);
}(window.angular));
