(function (angular, RuiCharts, Select) {
    angular.module('metric').directive('lineChart',
        ['$timeout', function ($timeout) {
            var link = function ($scope, element) {
                var chart;

                function drawGraph(seriesArray, colorsArray) {
                    if (element.is(":hidden")) {
                        element.show();
                    }

                    var xAxisTickPixelInterval = 68;

                    chart = RuiCharts.lineChart({
                        renderTo: 'line-chart',
                        height: 300,
                        series: seriesArray,
                        //yAxisLabelFormatter: trendChartFormatterFactory.yAxisLabelFormatter(),
                        xAxisTickPixelInterval: xAxisTickPixelInterval,
                        //pointFormatter: trendChartFormatterFactory.pointFormatter(),
                        //legendFooterFormatter: trendChartFormatterFactory.legendFooterFormatter(),
                        colors: colorsArray
                    });
                    chart.draw();
                }

            };
            return {
                link: link,
                restrict: 'E',
                scope: {
                    //dataType: '@sourceType',
                    //intervalType: '@',
                    //graphType: '@',
                    //chartTitle: '@',
                    //propertyConfig: '=',
                    //location: '=',
                    //currentTrend: '&',
                    //seriesData: '&'
                },
                templateUrl: '/templates/chart.html',
                controller: 'ChartsController',
                replace: true
            };
        }]);
}(window.angular, window.RUI.Charts, window.RUI.Select));