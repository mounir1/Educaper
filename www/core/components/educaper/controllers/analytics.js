// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.core.educaper')

/**
 * Controller to handle the list of sections in App settings.
 *
 * @module mm.core.settings
 * @ngdoc controller
 * @name mmSettingsListCtrl
 */

.controller('mmAnalyticsCtrl', function($scope, $mmCourses, $mmUtil, $mmSettingsDelegate) {
    $scope.isIOS = ionic.Platform.isIOS();
    $scope.handlers = $mmSettingsDelegate.getHandlers();
    $scope.areHandlersLoaded = $mmSettingsDelegate.areHandlersLoaded;


    Highcharts.chart('barchar', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Browsers Usage'
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
            data: [{
                name: "Microsoft Internet Explorer",
                y: 56.33
            }, {
                name: "Chrome",
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: "Firefox",
                y: 10.38
            }, {
                name: "Safari",
                y: 4.77
            }, {
                name: "Opera",
                y: 0.91
            }, {
                name: "Proprietary or Undetectable",
                y: 0.2
            }]

        }]
    });

    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Temperature Data'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
        },

        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    });

    Highcharts.chart('piechart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
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
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]
        }]
    });

    // Highcharts.chart('dynamic', {

    //     title: {
    //         text: 'Chart.update'
    //     },

    //     subtitle: {
    //         text: 'Plain'
    //     },

    //     xAxis: {
    //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //     },

    //     series: [{
    //         type: 'column',
    //         colorByPoint: true,
    //         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
    //         showInLegend: false
    //     }]

    // });


    // $('#plain').click(function() {
    //     chart.update({
    //         chart: {
    //             inverted: false,
    //             polar: false
    //         },
    //         subtitle: {
    //             text: 'Plain'
    //         }
    //     });
    // });

    // $('#inverted').click(function() {
    //     chart.update({
    //         chart: {
    //             inverted: true,
    //             polar: false
    //         },
    //         subtitle: {
    //             text: 'Inverted'
    //         }
    //     });
    // });

    // $('#polar').click(function() {
    //     chart.update({
    //         chart: {
    //             inverted: false,
    //             polar: true
    //         },
    //         subtitle: {
    //             text: 'Polar'
    //         }
    //     });
    // });
});