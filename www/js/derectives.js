angular.module('app.derectives', [])

 .directive('xchart', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                main: "=",
                comp: "=",
                options: "="
            },
            template: '<div class="xchart" ng-style="style"></div>',
            link: function (scope, element, attrs) {
                var style = {};
                if (angular.isDefined(attrs.height)) {
                    style.height = attrs.height + 'px';
                }
                if (angular.isDefined(attrs.width)) {
                    style.width = attrs.width + 'px';
                }

                scope.style = style;

                // Override the default data settings
                var data = {
                    xScale: angular.isDefined(attrs.scaleX) ? attrs.scaleX : 'ordinal',
                    yScale: angular.isDefined(attrs.scaleY) ? attrs.scaleY : 'ordinal',
                    main: [],
                    comp: []
                };
                var type = angular.isDefined(attrs.type) ? attrs.type : 'line-dotted';

                var chart;
                scope.$watch('type', function (t) {
                    if (chart === undefined) {
                        chart = new xChart(type, data, '#' + attrs.id, {});
                    } else {
                        chart.setType(t)
                    }
                });

                scope.$watch('main', function (d) {
                    data.main = d;
                    if (chart === undefined) {
                        chart = new xChart(type, data, '#' + attrs.id, {});
                    } else {
                        chart.setData(data);
                    }
                });

                scope.$watch('comp', function (d) {
                    data.comp = d;
                    if (chart === undefined) {
                        chart = new xChart(type, data, '#' + attrs.id, {});
                    } else {
                        chart.setData(data);
                    }
                })
            }
        };
    }])
    
    .directive('hcChart', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                options: '='
            },
            link: function (scope, element) {
                Highcharts.chart(element[0], scope.options);
            }
        };
    })
    // Directive for pie charts, pass in title and data only    
    .directive('hcPieChart', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                title: '@',
                data: '='
            },
            link: function (scope, element) {
                Highcharts.chart(element[0], {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: scope.title
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
                    series: [{
                        data: scope.data
                    }]
                });
            }
        };
    });