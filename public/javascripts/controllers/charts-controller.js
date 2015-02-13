(function (angular, $, moment, Story) {

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
                    var seriesName = Story.storyTypes;
                    var seriesData = [];
                    for (var i = 0; i < seriesName.length; i++) {
                        seriesData.push($scope.currentTrend(seriesName[i], $scope.trendControls));
                    }
                    return seriesData;
                };

                $scope.currentTrend = function (storyType, trendControls) {
                    transformToDate(storyType.name);
                    return {
                        "seriesLabel": storyType.seriesLabel,
                        "xLabelData": dateFormatter(trendControls.intervalType),
                        "yData": $scope.allData[storyType.name],
                        "color": storyType.color
                    };
                };

                function dateFormatter(intervalType) {
                    return {"weekly": weekly}[intervalType];
                }

                $scope.$on('LINE_CHART_DATA_CHANGE', function (e, data) {
                    $scope.allData = data["trends"];
                    $scope.$broadcast('TREND_DATA_CHANGE');
                });

                function transformToDate(storyType) {
                    var data = $scope.allData[storyType];
                    var convertXtoDate = [];
                    for (var i = 0; i < data.length; i++) {
                        convertXtoDate.push({x: toDate(data[i].x), y: data[i].y});
                    }
                    $scope.allData[storyType] = convertXtoDate;
                }

                function toDate(date) {
                    return moment(date).add(10, 'h').toDate();
                }

                function weekly(date) {
                    return moment(date).format('dddd YYYY-MM-DD');
                }
            }
        ]);

}(window.angular, window.jQuery, window.moment, window.Metric.Story));
