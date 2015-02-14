(function (angular) {
    angular.module('metric').directive('metricDashboard',
        [function () {
            function link($scope, element) {
                $scope.themes = ['mint-theme', 'yellow-theme', 'orange-theme'];
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
