(function (angular) {
    angular.module('metric').directive('metricDashboard',
        [function () {
            function link($scope, element) {
                $scope.themes = ['red-theme', 'orange-theme', 'yellow-theme', 'green-theme', 'blue-theme', 'indigo-theme', 'violet-theme'];
            }

            return {
                controller: 'MetricDashboardController',
                link: link,
                scope: {
                    metricName: '@',
                    theme: '@'
                },
                restrict: 'E',
                templateUrl: '/templates/metric-dashboard',
                replace: true
            };
        }]);
}(window.angular));
