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
                    return {
                        "seriesLabel": storyType.seriesLabel,
                        "xLabelData": dateFormatter(trendControls.intervalType),
                        "yData": $scope.allData[trendControls.dataType],
                        "color": storyType.color
                    };
                };

                function dateFormatter(intervalType) {
                    return {"weekly": weekly}[intervalType];
                }

                $scope.$on('LINE_CHART_DATA_CHANGE', function (e, data) {
                    $scope.allData = data["trends"];
                    transformToDate($scope.trendControls.dataType);
                    $scope.$broadcast('TREND_DATA_CHANGE');
                });

                function transformToDate(dataType) {
                    var data = $scope.allData[dataType];
                    var convertXtoDate = [];
                    for (var i = 0; i < data.length; i++) {
                        convertXtoDate.push({x: toDate(data[i].x), y: data[i].y});
                    }
                    $scope.allData[dataType] = convertXtoDate;
                }

                function toDate(date){
                    return moment(date).toDate();
                }
                function weekly(date) {
                    return moment(date).format('dddd YYYY-MM-DD');
                }
            }
        ]);

}(window.angular, window.jQuery, window.moment));
