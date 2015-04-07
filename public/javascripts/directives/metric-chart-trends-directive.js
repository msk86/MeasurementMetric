(function (angular, RuiCharts) {
    angular.module('metric').directive('metricChartTrends',
        [function () {
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

                function pointFormatter(point){
                  var template = '{{name}}  <span class="legend-point-value" style="color: {{color}}">{{label}}</span><br/>';
                  return template
                    .replace("{{color}}", point.series.color)
                    .replace("{{name}}", point.series.name)
                    .replace("{{label}}", point.y);
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
                        min: 0,
                        pointFormatter: pointFormatter,
                        xAxisTickPixelInterval: xAxisTickPixelInterval,
                        colors: colors
                    });
                    chart.draw();
                }

            };
            return {
                link: link,
                restrict: 'E',
                scope: {
                    metricName: '=',
                    timeFrame: '=',
                    dataType: '@sourceType',
                    intervalType: '@',
                    graphType: '@',
                    seriesData: '&'
                },
                templateUrl: '/templates/metric-chart-trends',
                controller: 'MetricChartTrendsController',
                replace: true
            };
        }]);
}(window.angular, window.RUI.Charts));
