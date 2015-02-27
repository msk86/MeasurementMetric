(function (angular) {

    angular.module('metric').controller('MetricCreateController',
        ['$scope', 'MetricCreateService',
            function ($scope, MetricCreateService) {
                var defaultFormValue = {
                    category: 'normal',
                    timeFrame: 'week',
                    processMethod: 'total',
                    startFrom: 'thisweek'
                };

                function resetForm() {
                    $scope.form = angular.extend({}, defaultFormValue);
                }

                resetForm();

                $scope.create = function() {
                    return MetricCreateService.createMetric($scope.form).then(function() {
                        resetForm();
                        $scope.$emit('NEW_METRIC_CREATED');
                    });
                }
            }
        ]);

}(window.angular));
