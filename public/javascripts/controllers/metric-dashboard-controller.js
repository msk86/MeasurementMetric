(function (angular) {

    angular.module('metric').controller('MetricDashboardController',
        ['$scope', '$timeout', 'MetricSettingsService',
            function ($scope, $timeout, MetricSettingsService) {
                var REFRESH_INTERVAL = 5 * 60 * 1000;
                $scope.settingses = [];

                $scope.$on('NEW_METRIC_CREATED', function() {
                    loadSettings();
                });

                function loadSettings() {
                    MetricSettingsService.allSettings().then(function(settingses) {
                        var scopeSettingsIds = $scope.settingses.map(function(s) {return s._id + s.updatedTime;}).sort().join();
                        var newSettingsIds = settingses.map(function(s) {return s._id + s.updatedTime;}).sort().join();
                        if(newSettingsIds == scopeSettingsIds) {
                            $scope.$broadcast('REFRESH_SIGNAL');
                        } else {
                            $scope.settingses = settingses;
                        }
                    });
                }

                function refresh() {
                    loadSettings();
                    $timeout(refresh, REFRESH_INTERVAL);
                }

                refresh();
            }
        ]);

}(window.angular));
