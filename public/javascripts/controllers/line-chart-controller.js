(function (angular, $, moment, ColorGen) {

    angular.module('metric').controller('LineChartController',
        ['$scope', '$timeout', 'DataService',
            function ($scope, $timeout, DataService) {
                $scope.lineData = {};

                $scope.trendControls = {
                    dataType: $scope.dataType,
                    intervalType: $scope.intervalType,
                    graphType: $scope.graphType,
                    chartTitle: $scope.chartTitle
                };

                $scope.seriesData = function () {
                    var a = [];
                    for(var k in $scope.lineData) {
                        var label = k == 'all' ? 'All' : k;
                        a.push({name: k, seriesLabel: label, color: ColorGen.next()});
                    }

                    return chartData(a, $scope.lineData);
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

                function updateLineData(metricName, timeFrame) {
                    DataService.lineChartData(metricName, timeFrame).then(function(data) {
                        $scope.lineData = data["trends"];
                        $scope.$broadcast('TREND_DATA_CHANGE');
                    });
                }

                $scope.$on('TIME_FRAME_CHANGE', function(e, timeFrame) {
                    updateLineData($scope.metricName, timeFrame);
                });

                updateLineData($scope.metricName, $scope.timeFrame);
            }
        ]);

}(window.angular, window.jQuery, window.moment, window.Metric.ColorGen));
