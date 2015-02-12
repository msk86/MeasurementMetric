(function (angular) {

    angular.module('metric').controller('MetricCreateController',
        ['$scope',
            function ($scope) {
                $scope.form = {
                    category: 'normal',
                    timeFrame: 'Week'
                };
            }
        ]);

}(window.angular));
