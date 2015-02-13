/* RUI: REA User Interface library - Charts - v3.0.4
   Copyright 2014, REA Group */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-chart-default-options', ['jquery'], function ($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.ChartDefaultOptions = factory(root.jQuery);
    }
}(this, function ($) {

    var defaultOptions = {
        renderTo: undefined,
        series: undefined,
        xAxisType: 'datetime',
        colors: ['#fb7f68', '#2cb2aa', '#a44392', '#1eb7ea', '#ee204e',
            '#00ac6d', '#b4674d', '#efc142'],
        xAxisTickPixelInterval: 100,
        yAxisTickPixelInterval: 100,
        yAxisLabelFormatter: null,
        loadEventHandler: null,
        spacingBottom: 15,
        height: 400,
        marginRight: 20,
        legendEnabled: true,
        pointFormatter: defaultPointFormatter
    };

    function overwriteDefaults (options) {
        return $.extend({}, defaultOptions, options);
    }

    function defaultPointFormatter (point) {
        return '<span class="default" style="color:' + point.series.color + '">' +
            point.y + '</span><br/>';
    }

    return {
        overwriteDefaults: overwriteDefaults
    };

}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-chart-mobile-legend', ['jquery'], function ($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.ChartMobileLegend = factory(root.jQuery);
    }
}(this, function ($) {

    function buildLegend(legendPointModels, hoverPoints, options) {
        var s = [];

        $.each(legendPointModels, function(i, legendPoint){
            s.push(buildLegendItem(legendPoint, options.pointFormatter));
        });

        if (options.legendFooterFormatter) {
            s.push(buildLegendFooter(options.legendFooterFormatter(hoverPoints)));
        }

        return s.join('');
    }

    function buildLegendItem(pointData, pointFormatter) {
        var s = [];

        s.push('<div class="rui-chart-legend-item">');
        s.push(buildLegendLabel(pointData.name, pointData.color));
        s.push(buildLegendText(pointData.point, pointFormatter));
        s.push('</div>');

        return s.join('');
    }

    function buildLegendLabel(seriesName, color) {
        var s = [];

        s.push("<div class='rui-chart-legend-label'>");
        s.push("<div class='rui-chart-circle' style='border-color:" + color + "'></div>");
        s.push("<div class='rui-chart-strike' style='background:" + color + "'></div>");
        s.push("<span>" + seriesName + "</span>");
        s.push("</div>");

        return s.join('');
    }

    function buildLegendText(point, pointFormatter) {
        var s = [];

        s.push("<div class='rui-chart-legend-text'>");
        if (point && point.y) {
            s.push(pointFormatter(point));
        } else {
            s.push('&nbsp;');
        }
        s.push("</div>");

        return s.join('');
    }

    function buildLegendFooter(formattedLegendFooter) {
        var s = [];
        s.push("<div class='rui-chart-legend-footer'>");
        s.push(formattedLegendFooter);
        s.push('</div>');
        return s.join('');
    }

    return {
        buildLegend: buildLegend
    };
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-chart-mobile', ['jquery', 'rui-chart-mobile-legend'],
               function ($, ChartMobileLegend) {
            return factory($, ChartMobileLegend);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.ChartMobile = factory(root.jQuery, root.RUI.ChartMobileLegend);
    }
}(this, function ($, ChartMobileLegend) {

    var MOBILE_LEGEND_CLASS = 'rui-chart-mobile-legend';

    function mobileChartOptionsFor(opts) {
        var options = opts;
        var newOptions = $.extend({}, opts, {
            legendEnabled: false,
            height: opts.height * 0.85,
            tooltipRefreshHandler: function () {
                if (opts.tooltipRefreshHandler) {
                    opts.tooltipRefreshHandler.apply(this, arguments);
                }
                createCustomLegend.apply(this, arguments);
            },
            loadEventHandler: function () {
                if (opts.loadEventHandler) {
                    opts.loadEventHandler.apply(this, arguments);
                }
                drawCrossHairAndDisplayTooltip.apply(this, arguments);
            },
            redrawEventHandler: function () {
                if (opts.redrawEventHandler) {
                    opts.redrawEventHandler.apply(this, arguments);
                }
                drawCrossHairAndDisplayTooltip.apply(this, arguments);
            }
        });

        function drawCrossHairAndDisplayTooltip(evt) {
            var chart = evt.target,
                series = chart.series,
                lastPoints = [];

            var lastPointIndex = (series.length > 0) &&
                lastValidPointIndex(series[0].points);

            if (lastPointIndex) {
                for(var i=0, l=series.length; i<l; i++) {
                    lastPoints.push(series[i].points[lastPointIndex]);
                }

                chart.axes[0].drawCrosshair(evt, lastPoints[0]);
                chart.tooltip.refresh(lastPoints);
            }
        }

        function lastValidPointIndex(points) {
            for (var i = points.length-1; i >= 0; i--) {
                if (points[i].y) return i;
            }
        }

        function createCustomLegend() {
            var highchart = this,
                hoverPoints = highchart.hoverPoints;

            var legendPointModels = legendPointModelsFor(highchart.series, hoverPoints);

            getMobileLegendContainer(highchart).html(
                ChartMobileLegend.buildLegend(legendPointModels, hoverPoints, options)
            );
        }

        function legendPointModelsFor(series, hoverPoints) {
            return $.map(series, function (seriesItem) {
                var pointModel = {
                    name: seriesItem.name,
                    color: seriesItem.color,
                    point: null
                };

                $.each(hoverPoints, function (i, hoverPoint) {
                    if (hoverPoint.series.index === seriesItem.index) {
                        pointModel.point = hoverPoint;
                    }
                });

                return pointModel;
            });
        }

        function getMobileLegendContainer(highchart) {
            var $chartContainer = $(highchart.renderTo),
            $mobileLegend = $chartContainer.find('.' + MOBILE_LEGEND_CLASS);

            if ($mobileLegend.length <= 0) {
                $mobileLegend = $('<div class="' + MOBILE_LEGEND_CLASS + '"/>');
                $chartContainer.append($mobileLegend);
            }
            return $mobileLegend;
        }

        return newOptions;
    }

    return {
        mobileChartOptionsFor: mobileChartOptionsFor
    };

}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-chart-options', ['jquery'], function ($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.ChartOptions = factory(root.jQuery);
    }
}(this, function ($) {

    function getChartOptions (options) {
        var chartOptions = {
            series: options.series,
            chart: {
                renderTo: options.renderTo,
                type: options.type,
                backgroundColor: '#fcfcfc',
                height: options.height,
                borderWidth: 0,
                marginLeft: 60,
                marginTop: 45,
                marginRight: options.marginRight,
                style: {
                    fontFamily: 'Museo-Sans-300, Helvetica, Arial, sans-serif',
                    fontSize: '12px'
                },
                events: {
                    load: null,
                    tooltipRefresh: null
                },
                spacingBottom: options.spacingBottom
            },
            colors: options.colors,
            credits: {
                enabled: false
            },
            title: options.title,
            legend: {
                enabled: options.legendEnabled,
                itemStyle: {
                    color: '#333',
                    cursor: 'default',
                    fontSize: '13px',
                    fontWeight: 'normal'
                },
                borderColor: '#e8e8e8',
                backgroundColor: '#fff',
                borderRadius: '3',
                borderWidth: '1',
                margin: 15,
                padding: 10
            },
            xAxis: {
                type: options.xAxisType,
                categories: options.categories,
                maxPadding: 0.05,
                minPadding: 0.06,
                tickLength: 0,
                lineColor: '#e8e8e8',
                gridLineColor: '#e8e8e8',
                labels: {
                    style: {
                        color: '#777',
                        fontSize: '12px'
                    }
                },
                dateTimeLabelFormats: options.dateTimeLabelFormats,
                tickPixelInterval: options.xAxisTickPixelInterval
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    style: {
                        color: '#777',
                        fontSize: '12px'
                    },
                    formatter: function() {
                        if (options.yAxisLabelFormatter) {
                            return options.yAxisLabelFormatter(this.value);
                        } else {
                            return this.value;
                        }
                    },
                    align: 'center',
                    x: 0,
                    y: 4
                },
                offset: 25,
                tickPixelInterval: (options.height - 45) / 2,
                gridLineColor: '#e8e8e8'
            },
            tooltip: {
                crosshairs: [
                    {width: 1, color: '#777'}
                ],
                shape: 'square',
                shared: true,
                useHTML: true,
                shadow: false,
                borderRadius: 5,
                borderColor: '#d6d6d6',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                style: {
                    fontSize: '16px',
                    padding: '10px'
                },
                enabled: true
            },
            plotOptions: {
                series: {
                    animation: {
                        duration: 1000
                    },
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 4,
                            halo: false
                        }
                    },
                    marker: {
                        lineWidth: 2,
                        radius: 4,
                        fillColor: '#fff',
                        lineColor: null,
                        symbol: 'circle',
                        states: {
                            hover: {
                                lineWidth: 4,
                                radius: 5
                            }
                        }
                    }
                },
                line: {
                    events: {
                        legendItemClick: function () {
                            return false;
                        }
                    }
                }
            }
        };
        addEventHandlers(chartOptions, options);
        addFormatters(chartOptions, options);
        return chartOptions;
    }

    function addEventHandlers(chartOptions, options) {
        chartOptions.chart.events.load = options.loadEventHandler;
        chartOptions.chart.events.redraw = options.redrawEventHandler;
        chartOptions.chart.events.tooltipRefresh = options.tooltipRefreshHandler;

        return chartOptions;
    }

    function addFormatters(chartOptions, options) {
        chartOptions.tooltip.formatter = function () {
            var s =[], points = [];
            $.each(this.points, function(i, point) {
                points.push(point.point);
                s.push(options.pointFormatter(point.point));
            });
            if (options.legendFooterFormatter) {
                s.push(options.legendFooterFormatter(points));
            }
            return s.join('');
        };
        return chartOptions;
    }

    function forHighchart(options) {
        options = options || {};
        checkForMinimalOptions(options);
        return getChartOptions(options);
    }

    function checkForMinimalOptions(options) {
        var requiredOptions = ['renderTo', 'series'];
        for(var i = 0; i < requiredOptions.length; i++) {
            if(options[requiredOptions[i]] === undefined) {
                throw new Error("chart options require key '" + requiredOptions[i] + "'");
            }
        }
    }

    return {
        forHighchart: forHighchart
    };
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-chart-tooltip-always-on-side', function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.ChartTooltipAlwaysOnSide = factory();
    }
}(this, function () {

    function wrap(highcharts) {
        highcharts.wrap(highcharts.Tooltip.prototype, 'getPosition', fudgeTooltipGetPosition);
    }

    function fudgeTooltipGetPosition(proceed, boxWidth, boxHeight, point) {
        var originalLen = this.len;
        this.len = 2;
        var pos = proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        this.len = originalLen;
        return pos;
    }

    return {
        wrap: wrap
    };
}));
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-charts', [
                'highcharts',
                'rui-chart-default-options',
                'rui-chart-tooltip-always-on-side',
                'rui-chart-mobile',
                'rui-chart-options'
            ],
            function (Highcharts,
                      ChartDefaultOptions,
                      ChartTooltipAlwaysOnSide,
                      ChartMobile,
                      ChartOptions) {
                return factory(
                    Highcharts,
                    ChartDefaultOptions,
                    ChartTooltipAlwaysOnSide,
                    ChartMobile,
                    ChartOptions
                );
            });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Charts = factory(
            root.Highcharts,
            root.RUI.ChartDefaultOptions,
            root.RUI.ChartTooltipAlwaysOnSide,
            root.RUI.ChartMobile,
            root.RUI.ChartOptions
        );
    }
}(this, function (Highcharts, ChartDefaultOptions, ChartTooltipAlwaysOnSide,
                  ChartMobile, ChartOptions) {

    var Chart = function (options) {
        this.options = ChartDefaultOptions.overwriteDefaults(options);
        this.containerEl = $('#' + options.renderTo);
        this.isMobile = withinMobileBreakpoint(this.containerEl);

        if (this.isMobile) {
            this.options = ChartMobile.mobileChartOptionsFor(this.options);
            this.containerEl.addClass('rui-chart-mobile-chart');
        } else {
            ChartTooltipAlwaysOnSide.wrap(Highcharts);
        }
    };

    Chart.prototype = {
        draw: function() {
            return new Highcharts.Chart(ChartOptions.forHighchart(this.options));
        }
    };

    function hideHighchartsTooltip(chartContainerId) {
        var chartContainer = $('#' + chartContainerId);
        chartContainer.addClass('rui-chart-mobile-chart');
    }

    function withinMobileBreakpoint(containerEl) {
        return (Math.max(containerEl.width() || 0)  <= 640);
    }

    function lineChart(options) {
        options.type = 'line';
        return new Chart(options);
    }

    return {
        lineChart: lineChart
    };
}));
