(function (angular) {
    angular.module('metric').directive('scheduleMetricForm',
        [function () {
            return {
                link: function($scope) {
                    $scope.clickTestApi = function() {
                        $scope.testApi().then(function(data) {
                            alert('Processed data is: \n' + JSON.stringify(data));
                        }, function(e){
                            alert('Errors: ' + e);
                        });
                    }
                },
                scope: true,
                restrict: 'E',
                templateUrl: '/templates/schedule-metric-form',
                replace: true
            };
        }]);
}(window.angular));
