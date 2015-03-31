(function (angular) {

    angular.module('metric').controller('MetricCreateController',
        ['$scope', 'MetricCreateService',
            function ($scope, MetricCreateService) {
                $scope.form = angular.extend({}, $scope.settings);
                if($scope.form.metricTypes) $scope.form.metricTypes = $scope.form.metricTypes.join(';');
                if($scope.form.fields) $scope.form.fields = $scope.form.fields.join(';');
                if($scope.form.startFrom) delete $scope.form.startFrom;

                var defaultFormValue = angular.extend({
                    category: 'normal',
                    stsAll: 1,
                    timeFrame: 'week',
                    processMethod: 'total',
                    startFrom: 'thisweek'
                }, $scope.form);

                function resetForm() {
                    $scope.form = angular.extend({}, defaultFormValue);
                }

                resetForm();

                $scope.create = function() {
                    if($scope.submitAction=='update') {
                        return MetricCreateService.updateMetric($scope.form).then(function() {
                            resetForm();
                            $scope.$emit('NEW_METRIC_CREATED');
                        });
                    } else {
                        return MetricCreateService.createMetric($scope.form).then(function() {
                            resetForm();
                            $scope.$emit('NEW_METRIC_CREATED');
                        });
                    }
                };

                $scope.testApi = function() {
                    return MetricCreateService.testApi($scope.form);
                };
            }
        ]);

}(window.angular));
