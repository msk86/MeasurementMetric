(function (angular, Highcharts) {
    angular.module('metric').directive('pieChart',
        ['$timeout', function ($timeout) {

            var link = function ($scope, element) {
                $scope.$on('PIE_DATA_CHANGE', function () {
                    $scope.updateChart();
                });

                $scope.updateChart = function () {
                    $scope.pieData = $scope.pieChartData();

                    var chartSeries = formatSeries($scope.pieData),
                        series = chartSeries.series,
                        colors = chartSeries.colors;
                        drawGraph(series, colors);
                };

                function formatSeries(data) {
                    var series = [{"data": [], name: 'Stories'}],
                        colors = [];
                    for (var i = 0; i < data.length; i++) {
                        series[0]["data"].push({
                            name: data[i].seriesLabel,
                            y: data[i].yData[0].y
                        });
                        colors.push(data[i].color);
                    }
                    return {series: series, colors: colors};
                }

                function drawGraph(series, colors) {
                    var chartOptions = {
                        chart: {
                            renderTo: element[0],
                            type: 'pie',
                            height: 300,
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        series: series,
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        title: {
                            text: ''
                        },
                        credits: {
                            enabled: false
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                colors: colors,
                                showInLegend: true
                            }
                        }
                    };
                    new Highcharts.Chart(chartOptions);
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
                    chartTitle: '@'
                },
                templateUrl: '/templates/pie-chart',
                controller: 'PieChartController',
                replace: true
            };
        }]);
}(window.angular, window.Highcharts));
