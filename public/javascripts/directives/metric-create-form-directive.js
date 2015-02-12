(function (angular) {
    angular.module('metric').directive('metricCreateForm',
        [function () {
            function link($scope, element) {
                $scope.categories = ['normal', 'schedule'];
                $scope.form = {};
                $scope.form.category = 'normal';

                $scope.$watch('form.category', function() {
                    console.log($scope.form.category);
                })
            }

            return {
                link: link,
                scope: true,
                restrict: 'E',
                templateUrl: '/templates/metric-create-form',
                replace: true
            };
        }]);
}(window.angular));
