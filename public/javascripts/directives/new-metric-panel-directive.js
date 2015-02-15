(function (angular) {
    angular.module('metric').directive('newMetricPanel',
        [function () {
            function link($scope, element) {
                $scope.isForm = false;

                $scope.toggleCreateForm = function() {
                    $scope.isForm = !$scope.isForm;
                };
            }

            return {
                link: link,
                scope: true,
                restrict: 'E',
                templateUrl: '/templates/new-metric-panel',
                replace: true
            };
        }]);
}(window.angular));
