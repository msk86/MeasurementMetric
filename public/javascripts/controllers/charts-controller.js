(function (angular, $, moment, Story) {

    angular.module('metric').controller('ChartsController',
        ['$scope', '$timeout', 'ChartDataService', 'PieChartDataService',
            function ($scope, $timeout, ChartDataService, PieChartDataService) {
                $scope.allData = {};

                $scope.trendControls = {
                    dataType: $scope.dataType,
                    intervalType: $scope.intervalType,
                    graphType: $scope.graphType,
                    chartTitle: $scope.chartTitle
                };

                $scope.seriesData = function () {
                    return chartData(Story.storyTypes, $scope.allData);
                };

                $scope.pieChartData = function () {
                    var a = Story.storyTypes;
                    return chartData(a.slice(1), $scope.pieData);
                };

                function chartData(storyTypes, data) {
                    var seriesName = storyTypes;
                    var seriesData = [];
                    for (var i = 0; i < seriesName.length; i++) {
                        seriesData.push($scope.currentTrend(seriesName[i], $scope.trendControls, data));
                    }
                    return seriesData;
                }

                $scope.currentTrend = function (storyType, trendControls, chartData) {
                    transformToDate(chartData, storyType.name);
                    return {
                        "seriesLabel": storyType.seriesLabel,
                        "xLabelData": dateFormatter(trendControls.intervalType),
                        "yData": chartData[storyType.name],
                        "color": storyType.color
                    };
                };

                function dateFormatter(intervalType) {
                    return {"weekly": weekly}[intervalType];
                }

                $scope.$on('LINE_CHART_DATA_CHANGE', function (e, data) {
                    $scope.allData = ChartDataService.data()["trends"];
                    $scope.$broadcast('TREND_DATA_CHANGE');
                });

                $scope.$on('PIE_CHART_DATA_CHANGE', function (e, data) {
                    $scope.pieData = PieChartDataService.data()["pie"];
                    $scope.$broadcast('PIE_DATA_CHANGE');
                });

                function transformToDate(chartData, storyType) {
                    var data = chartData[storyType];
                    var convertXtoDate = [];
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            convertXtoDate.push({x: toDate(data[i].x), y: data[i].y});
                        }
                        chartData[storyType] = convertXtoDate;
                    }
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
