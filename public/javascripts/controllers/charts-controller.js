(function (angular, $, moment) {

    angular.module('metric').controller('ChartsController',
        ['$scope', '$timeout',
            function ($scope, $timeout) {
                $scope.allData = {};

                function xDataFor(date) {
                    return moment(date).startOf('year').toDate();
                }
            }]);
}(window.angular, window.jQuery, window.moment));
