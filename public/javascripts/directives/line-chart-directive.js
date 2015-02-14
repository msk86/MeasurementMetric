(function (angular, RuiCharts, moment) {
    angular.module('metric').directive('lineChart',
        ['$timeout', function ($timeout) {
            var link = function ($scope, element) {
                var chart;

                $scope.$on('TREND_DATA_CHANGE', function () {
                    $scope.updateChart();
                });

                $scope.updateChart = function () {
                    $scope.allData = $scope.seriesData();

                    var chartSeries = formatSeries($scope.allData),
                        series = chartSeries.series,
                        colors = chartSeries.colors;

                    drawGraph(series, colors);
                };

                function formatSeries(trendData) {
                    var series = [],
                        colors = [];
                    for (var i = 0; i < trendData.length; i++) {
                        series.push({
                            name: trendData[i].seriesLabel,
                            data: trendData[i].yData
                        });
                        colors.push(trendData[i].color);
                    }
                    return {series: series, colors: colors};
                }

                function drawGraph(series, colors) {
                    var xAxisTickPixelInterval = 68;

                    chart = RuiCharts.lineChart({
                        renderTo: element[0],
                        height: 300,
                        series: series,
                        dateTimeLabelFormats: {
                            day: '%a'
                        },
                        //yAxisLabelFormatter: trendChartFormatterFactory.yAxisLabelFormatter(),
                        xAxisTickPixelInterval: xAxisTickPixelInterval,
                        //pointFormatter: trendChartFormatterFactory.pointFormatter(),
                        //legendFooterFormatter: trendChartFormatterFactory.legendFooterFormatter(),
                        colors: colors
                    });
                    chart.draw();
                }

            };
            return {
                link: link,
                restrict: 'E',
                scope: {
                    metricName: '@',
                    timeFrame: '@',
                    dataType: '@sourceType',
                    intervalType: '@',
                    graphType: '@',
                    chartTitle: '@',
                    //currentTrend: '&',
                    seriesData: '&'
                },
                templateUrl: '/templates/line-chart',
                controller: 'LineChartController',
                replace: true
            };
        }]);
}(window.angular, window.RUI.Charts, window.moment));
