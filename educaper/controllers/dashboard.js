angular.module('mm.core.educaper')


.controller('mmDashboardCtrl', function($scope, $rootScope, $mmCourses, $mmUtil, $mmSettingsDelegate) {
    $scope.isIOS = ionic.Platform.isIOS();
    $scope.handlers = $mmSettingsDelegate.getHandlers();
    $scope.areHandlersLoaded = $mmSettingsDelegate.areHandlersLoaded;

    $scope.coursesname = $rootScope.coursesname;
    $scope.enrolledusers = $rootScope.enrolledusers;
    $scope.Courselength = $rootScope.lenCourses;
    $scope.MyData = [];


    for (var i = 0; i < $scope.Courselength; i++) {
        var jsonArg1 = {};
        jsonArg1.name = $scope.coursesname[i];
        jsonArg1.y = $scope.enrolledusers[i];
        $scope.MyData = $scope.MyData.concat(jsonArg1)
    }
    console.log($scope.MyData);


    console.log($scope.MyData);
    var chart = Highcharts.chart('piechart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Enrolled Users for Each Course'
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
            name: 'Students',
            colorByPoint: true,
            data: $scope.MyData
        }]
    });

    // var chart1 = Highcharts.chart('container', {

    //         chart: {
    //             type: 'gauge',
    //             plotBackgroundColor: null,
    //             plotBackgroundImage: null,
    //             plotBorderWidth: 0,
    //             plotShadow: false
    //         },

    //         title: {
    //             text: 'Accuracy-meter'
    //         },

    //         pane: {
    //             startAngle: -150,
    //             endAngle: 150,
    //             background: [{
    //                     backgroundColor: {
    //                         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    //                         stops: [
    //                             [0, '#FFF'],
    //                             [1, '#333']
    //                         ]
    //                     },
    //                     borderWidth: 0,
    //                     outerRadius: '109%'
    //                 }, {
    //                     backgroundColor: {
    //                         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    //                         stops: [
    //                             [0, '#333'],
    //                             [1, '#FFF']
    //                         ]
    //                     },
    //                     borderWidth: 1,
    //                     outerRadius: '107%'
    //                 }, {
    //                     // default background
    //                 }
    //                 /*, {
    //                 	            backgroundColor: '#DDD',
    //                 	            borderWidth: 0,
    //                 	            outerRadius: '105%',
    //                 	            innerRadius: '103%'
    //                 	        }*/
    //             ]
    //         },

    //         // the value axis
    //         yAxis: {
    //             min: 0,
    //             max: 200,

    //             minorTickInterval: 'auto',
    //             minorTickWidth: 1,
    //             minorTickLength: 10,
    //             minorTickPosition: 'inside',
    //             minorTickColor: '#666',

    //             tickPixelInterval: 30,
    //             tickWidth: 2,
    //             tickPosition: 'inside',
    //             tickLength: 10,
    //             tickColor: '#666',
    //             labels: {
    //                 step: 2,
    //                 rotation: 'auto'
    //             },
    //             title: {
    //                 text: "accuracy"
    //             },
    //             plotBands: [{
    //                 from: 0,
    //                 to: 40,
    //                 color: '#DF5353' // green
    //             }, {
    //                 from: 40,
    //                 to: 120,
    //                 color: '#DDDF0D' // yellow
    //             }, {
    //                 from: 120,
    //                 to: 200,
    //                 color: '#55BF3B' // red
    //             }]
    //         },

    //         series: [{
    //             name: 'accuracy',
    //             data: [80],
    //             tooltip: {
    //                 valueSuffix: ' ac/u'
    //             },
    //             dataLabels: {
    //                 enabled: true,
    //                 style: {
    //                     fontWeight: 'bold',
    //                     fontSize: '22px'
    //                 }
    //             }
    //         }]

    //     },
    //     // Add some life
    //     function(chart) {
    //         if (!chart.renderer.forExport) {
    //             setInterval(function() {

    //                 var point = chart.series[0].points[0],
    //                     newVal,
    //                     inc = Math.round((Math.random() - 0.5) * 20);

    //                 newVal = point.y + inc;
    //                 if (newVal < 0 || newVal > 200) {
    //                     newVal = point.y - inc;
    //                 }

    //                 point.update(newVal);

    //             }, 3000);
    //         }
    //     }

    // );

});