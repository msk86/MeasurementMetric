(function (angular, Highcharts) {
    angular.module('metric').directive('pieChart',
        ['$timeout', function ($timeout) {

            var link = function ($scope, element) {
                var chart;

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
                        series: [{
                            name: 'Browser share',
                            data: [
                                ['Firefox', 45.0],
                                ['IE', 26.8],
                                {
                                    name: 'Chrome',
                                    y: 12.8,
                                    sliced: true,
                                    selected: true
                                },
                                ['Safari', 8.5],
                                ['Opera', 6.2],
                                ['Others', 0.7]
                            ]
                        }],
                        title: {
                            //text: moment(series[0].data[0].x).format("YYYY-MM-DD") + ' - ' + moment(series[0].data[6].x).format("YYYY-MM-DD"),
                            align: 'left',
                            style: {
                                fontSize: '12px'
                            }
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                    chartTitle: '@',
                    //currentTrend: '&',
                    seriesData: '&'
                },
                templateUrl: '/templates/pie-chart.html',
                controller: 'ChartsController',
                replace: true
            };
        }]);
}(window.angular, window.Highcharts));