(function (angular, $, moment, ColorGen) {

    angular.module('metric').controller('PieChartController',
        ['$scope', '$timeout', 'ChartDataService',
            function ($scope, $timeout, ChartDataService) {
                $scope.pieData = {};
                $scope.trendControls = {
                    dataType: $scope.dataType,
                    intervalType: $scope.intervalType,
                    graphType: $scope.graphType,
                    chartTitle: $scope.chartTitle
                };

                $scope.pieChartData = function () {
                    var a = [];
                    var onlyAll = true;
                    for(var k in $scope.pieData) {
                        if(k != 'all') onlyAll = false;
                    }
                    for(var k in $scope.pieData) {
                        if(onlyAll || k != 'all') {
                            var label = k == 'all' ? 'All' : k;
                            a.push({name: k, seriesLabel: label, color: ColorGen.next()});
                        }
                    }

                    return chartData(a, $scope.pieData);
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

                function updatePieData(metricName, timeFrame) {
                    ChartDataService.pieChartData(metricName, timeFrame).then(function(data) {
                        $scope.pieData = data["pie"];
                        $scope.$broadcast('PIE_DATA_CHANGE');
                    });
                }

                $scope.$on('TIME_FRAME_CHANGE', function(e, timeFrame) {
                    updatePieData($scope.metricName, timeFrame);
                });

                updatePieData($scope.metricName, $scope.timeFrame);
            }
        ]);

}(window.angular, window.jQuery, window.moment, window.Metric.ColorGen));
