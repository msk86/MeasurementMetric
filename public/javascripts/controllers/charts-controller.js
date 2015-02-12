(function (angular, $, moment) {

    angular.module('metric').controller('ChartsController',
        ['$scope', '$timeout', 'ChartDataService',
            function ($scope, $timeout, ChartDataService) {
                $scope.allData = {};

                $scope.trendControls = {
                    dataType: $scope.dataType,
                    intervalType: $scope.intervalType,
                    graphType: $scope.graphType,
                    chartTitle: $scope.chartTitle
                };

                $scope.seriesData = function () {
                    var seriesName = [
                        {seriesLabel: 'Stories', color: "#b4674d"},
                        {seriesLabel: 'Tech Tasks', color: "#1eb7ea"},
                        {seriesLabel: 'Bugs', color: "#fb7f68"}];
                    var seriesData = [];
                    for (var i = 0; i < seriesName.length; i++) {
                        seriesData.push($scope.currentTrend(seriesName[i], $scope.trendControls));
                    }
                    return seriesData;
                };

                $scope.currentTrend = function (storyType, trendControls) {
                    console.log($scope.allData[trendControls.dataType]);
                    return {
                        "seriesLabel": storyType.seriesLabel,
                        "xLabelData": dateFormatter(trendControls.intervalType),
                        "yData": $scope.allData[trendControls.dataType],
                        "color": storyType.color
                    };
                };

                function dateFormatter(intervalType) {
                    var weekly = function (date) {
                        return moment(date).toDate().format('dddd YYYY-MM-DD');
                    };
                    return {"weekly": weekly}[intervalType];
                }

                $scope.$on('LINE_CHART_DATA_CHANGE', function (e, data) {
                    console.log(data)
                    $scope.allData = data["trends"];
                    $scope.$broadcast('TREND_DATA_CHANGE');
                });
            }
        ]);

}(window.angular, window.jQuery, window.moment));
