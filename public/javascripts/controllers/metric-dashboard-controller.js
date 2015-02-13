(function (angular) {

    angular.module('metric').controller('MetricDashboardController',
        ['$scope', '$timeout', 'MetricSettingsService',
            function ($scope, $timeout, MetricSettingsService) {
                MetricSettingsService.allSettings().then(function(settingses) {
                    $scope.settingses = settingses;
                });
            }
        ]);

}(window.angular));
