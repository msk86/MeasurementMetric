(function (angular) {

    angular.module('metric').controller('MetricDashboardController',
        ['$scope', '$timeout', 'MetricSettingsService',
            function ($scope, $timeout, MetricSettingsService) {
                var REFRESH_INTERVAL = 5 * 60 * 1000;
                MetricSettingsService.allSettings().then(function(settingses) {
                    $scope.settingses = settingses;
                });

                function sendRefreshSignal() {
                    $scope.$broadcast('REFRESH_SIGNAL');
                    $timeout(sendRefreshSignal, REFRESH_INTERVAL);
                }
            }
        ]);

}(window.angular));
