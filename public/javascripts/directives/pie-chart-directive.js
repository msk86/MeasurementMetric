(function (angular, Highcharts) {
    angular.module('metric').directive('pieChart',
        ['$timeout', function ($timeout) {

            var link = function ($scope, element) {
                var chart;

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
                        console.log(data[i].yData);
                        series[0]["data"].push({
                            name: data[i].seriesLabel,
                            y: data[i].yData[0].y
                        });
                        colors.push(data[i].color);
                    }
                    return {series: series, colors: colors};
                }

                function drawGraph(series, colors) {
                    if (element.is(":hidden")) {
                        element.show();
                    }
                    var chartOptions = {
                        chart: {
                            renderTo: 'pie-chart',
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
                                showInLegend: true
                            }
                        }
                    };
                    var chart = new Highcharts.Chart(chartOptions);
                }

                $(function () {
                    var series = [];
                    var colors = [];
                    drawGraph(series, colors);
                });
            };
            return {
                link: link,
                restrict: 'E',
                scope: {
                    dataType: '@sourceType',
                    intervalType: '@',
                    graphType: '@',
                    chartTitle: '@'
                },
                templateUrl: '/templates/pie-chart.html',
                controller: 'ChartsController',
                replace: true
            };
        }]);
}(window.angular, window.Highcharts));