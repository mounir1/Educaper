angular.module('app.controllers', ['n3-pie-chart', 'nvd3', 'highcharts-ng', 'googlechart'])

    .value('mmMessagesMessageTabConst', 0)

    .value('mmMessagesContactTabConst', 1)

    .controller('sideMenuCtrl', function (mUsers, mCourses, $ionicPopup, $ionicPlatform, $rootScope, $scope, $state, mmAuth) {

        console.log("sideMenuCtrl");
        console.log("$rootScope.Educaper  " + $rootScope.Educaper);

        $scope.User = mmAuth.getCurrentUser();
        $scope.toggleEducaper = function () {
            $scope.EducaperMode = !$scope.EducaperMode;

            if ($scope.EducaperMode === true) {
                $rootScope.Educaper = true;
                $rootScope.pagetitle = "Educaper Dashboard";
            }

            else {
                $rootScope.Educaper = false;
                $rootScope.pagetitle = "My Courses";
            }

            console.log("$rootScope.Educaper  " + $rootScope.Educaper);

            if ($scope.EducaperMode) {
                console.log("EducaperModes");
                switch ($scope.User.role) { // to be change for regular normal user .
                    case "Education Expert":
                        $scope.EducaperExpertMode = true;
                        break;
                    case "Department Deen":
                        $scope.EducaperExpertMode = true;
                        break;
                    case "Instructor":
                        $scope.EducaperTeacherMode = true;
                        break;
                    case "Student":
                        $scope.EducaperStudentMode = true;
                        break;
                };
            }
            $state.go('site.index');
        }

        $rootScope.Department = null;

        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'TODO',
                template: 'This function is under construction !'
            });
            console.log("showAlert");;
            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };

        $scope.logout = function () {
            mmAuth.logout();
            $state.go('login.index');
        };

        $scope.invalidateCaches = function () {
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.Departments = null;
        $scope.Majors = null;
        $scope.Courses = null;
        $scope.Clicked = false;

        $scope.ShowDep = function () {
            $scope.Departments = ["engineering Department", "college of law", "school of tourizm", "business administration"];
            $scope.Majors = null;
        };

        $scope.ShowMajors = function () {
            $scope.Majors = ["Computer Engineering", "Electric Electronic", "school of tourizm", "business administration,Civil Engineering"];
            $scope.Departments = null;
            $scope.Courses = null;
        };

        $scope.ShowCourses = function () {
            $scope.Departments = null;
            $scope.Majors = null;
            console.log("mCourses :" + mCourses.all());
            $scope.Courses = mCourses.all();
        };

        $scope.goto = function (item) {
            $rootScope.Department = item;
            $scope.group = null;
            $scope.group1 = null;
        }
        $scope.courseinfo = function (ID) {
            if ($ionicPlatform.isTablet()) {
                $state.go('site.teachers.contacts-tablet.charts-tablet', {
                    ID: ID
                });

            } else {
                $state.go('site.teacher-charts', {
                    ID: ID
                });
            }
        }
    })

    .controller('mmTeachersCtrl', function ($rootScope, $scope, $state, $ionicPlatform, contacts) {
        var personIndex = null;

        console.log("mmTeachersCtrl");
        $rootScope.TabMode;
        $scope.contacts = contacts;
        for (var i = 0; i < contacts.length; i++) {
            contacts[i].value = Math.round((Math.random() * 99) + 1);
        }
        $scope.college = $rootScope.Department;

        $scope.currentIndex = null;
        if ($ionicPlatform.isTablet())
            $scope.isTab = true;
        else
            $scope.isTab = false;

        $scope.$on('mmMessagesContactSelected', function (e, index) {
            $scope.currentIndex = index;
        });

        $scope.$on('mmMessagesDiscussionSelected', function (e, index) {
            if (mmMessagesContactTabConst != $ionicTabsDelegate.$getByHandle('teachers-tabs').selectedIndex()) {
                $scope.currentIndex = null;
            }
        });

        $scope.getURL = function (index) {
            if ($ionicPlatform.isTablet()) {
                return $state.href('site.teachers.contacts-tablet', {
                    index: index
                });
            }
            return $state.href('site.teachers-contact', {
                index: index
            });
        };

        // Implemented this way for faster DOM update.
        $scope.$watch(function () {
            return $state.is('site.contacts-tablet');
        });
    })

    .controller('EducaperCtrl', function (mmAuth,$scope, $rootScope, $state) {

        $scope.User = mmAuth.getCurrentUser();

        ///d3
        $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function (d) { return d.label; },
                y: function (d) { return d.value; },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };

        $scope.data = [{
            key: "Cumulative Return",
            values: [
                { "label": "A", "value": 120 },
                { "label": "B", "value": 154 },
                { "label": "C", "value": 65 },
                { "label": "D", "value": 221 },
                { "label": "E", "value": 122 },
                { "label": "F", "value": 57 }

            ]
        }];

        // $scope.chart = {
        //     labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        //     datasets: [
        //         {
        //             fillColor: "rgba(151,187,205,0)",
        //             strokeColor: "#e67e22",
        //             pointColor: "rgba(151,187,205,0)",
        //             pointStrokeColor: "#e67e22",
        //             data: [4, 3, 5, 4, 6]
        //         },
        //         {
        //             fillColor: "rgba(151,187,205,0)",
        //             strokeColor: "#f1c40f",
        //             pointColor: "rgba(151,187,205,0)",
        //             pointStrokeColor: "#f1c40f",
        //             data: [8, 3, 2, 5, 4]
        //         }
        //     ]
        // };

        $scope.myChartOptions = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke: true,

            //String - The colour of each segment stroke
            segmentStrokeColor: "#fff",

            //Number - The width of each segment stroke
            segmentStrokeWidth: 24,

            //The percentage of the chart that we cut out of the middle.
            percentageInnerCutout: 50,

            //Boolean - Whether we should animate the chart
            animation: true,

            //Number - Amount of animation steps
            animationSteps: 100,

            //String - Animation easing effect
            animationEasing: "easeOutBounce",

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate: true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale: false,

            //Function - Will fire on animation completion.
            onAnimationComplete: null
        }
        ///highcharts with custom directives 
        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'line',
                    zoomType: 'x'
                }
            },
            series: [
                { data: [10, 15, 12, 8, 7, 1, 1, 19, 15, 10] },
                { data: [14, 4, 6, 12, 5, 4, 21, 3, 16, 23] }
            ],
            title: {
                text: 'Hello'
            },
            xAxis: { currentMin: 0, currentMax: 10, minRange: 1 },
            loading: false
        }
        $scope.chartConfig1 = {
            options: {
                chart: {
                    type: 'column',
                    zoomType: 'x'
                }
            },
            series: [{
                data: [10, 15, 12, 8, 7, 1, 1, 19, 15, 10]
            }, {
                    data: [14, 4, 6, 12, 5, 4, 21, 3, 16, 23]
                }],
            title: {
                text: 'Hello'
            },
            xAxis: { currentMin: 0, currentMax: 10, minRange: 1 },
            loading: false
        }
        $scope.chartConfig2 = {
            options: {
                chart: {
                    type: 'bar',
                    zoomType: 'x'
                }
            },
            series: [{
                data: [10, 15, 12, 8, 7, 1, 1, 19, 15, 10]
            }, {
                    data: [14, 4, 6, 12, 5, 4, 21, 3, 16, 23]
                }],
            title: {
                text: 'Hello'
            },
            xAxis: { currentMin: 0, currentMax: 10, minRange: 1 },
            loading: false
        }
        $scope.chartConfig3 = {
            options: {
                chart: {
                    type: 'bar',
                    zoomType: 'x'
                }
            },
            series: [
                {
                    data: [10, 15, 12, 8, 7, 1, 1, 19, 15, 10]
                }, {
                    data: [14, 4, 6, 12, 5, 4, 21, 3, 16, 23]
                }, {
                    data: [10, 15, 12, 8, 7, 1, 1, 19, 15, 10]
                },],

            title: {
                text: 'Hello'
            },
            xAxis: { currentMin: 0, currentMax: 10, minRange: 1 },
            loading: false
        }
        $scope.chartOptions = {
            title: {
                text: 'Temperature vs Student Performance'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            series: [
                { data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4] },
                { data: [35.9, 41.5, 76.4, 150.2, 120.0, 50.0, 100.6, 100.5, 50.4, 40.1, 50.6, 120.4] }
            ]
        };
        $scope.pieData = [
            {
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
            }];





        ///googlechart 
        $scope.sampleData = {
            "type": "ColumnChart",
            "cssStyle": "height:200px; width:300px;",
            "data": {
                "cols": [
                    {
                        "id": "month",
                        "label": "Month",
                        "type": "string"
                    },
                    {
                        "id": "laptop-id",
                        "label": "Laptop",
                        "type": "number"
                    },
                    {
                        "id": "desktop-id",
                        "label": "Desktop",
                        "type": "number"
                    },
                    {
                        "id": "server-id",
                        "label": "Server",
                        "type": "number"
                    },
                    {
                        "id": "cost-id",
                        "label": "Shipping",
                        "type": "number"
                    }
                ],
                "rows": [
                    {
                        "c": [
                            {
                                "v": "January"
                            },
                            {
                                "v": 19,
                                "f": "42 items"
                            },
                            {
                                "v": 12,
                                "f": "Ony 12 items"
                            },
                            {
                                "v": 7,
                                "f": "7 servers"
                            },
                            {
                                "v": 4
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "February"
                            },
                            {
                                "v": 13
                            },
                            {
                                "v": 1,
                                "f": "1 unit (Out of stock this month)"
                            },
                            {
                                "v": 12
                            },
                            {
                                "v": 2
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "March"
                            },
                            {
                                "v": 24
                            },
                            {
                                "v": 0
                            },
                            {
                                "v": 11
                            },
                            {
                                "v": 6
                            }
                        ]
                    }
                ]
            },
            "options": {
                "title": "Sales per month",
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Sales unit",
                    "gridlines": {
                        "count": 6
                    }
                },
                "hAxis": {
                    "title": "Date"
                }
            },
            "formatters": {}
        }
        $scope.sampleData.style = "width: 600px;height:400px;border: 1px solid red;padding-bottom: 40px;margin:auto";

        $scope.areachart = {
            "type": "AreaChart",
            "displayed": false,
            "data": {
                "cols": [
                    {
                        "id": "month",
                        "label": "Month",
                        "type": "string",
                        "p": {}
                    },
                    {
                        "id": "laptop-id",
                        "label": "Laptop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "desktop-id",
                        "label": "Desktop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "server-id",
                        "label": "Server",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "cost-id",
                        "label": "Shipping",
                        "type": "number"
                    }
                ],
                "rows": [
                    {
                        "c": [
                            {
                                "v": "January"
                            },
                            {
                                "v": 19,
                                "f": "42 items"
                            },
                            {
                                "v": 12,
                                "f": "Ony 12 items"
                            },
                            {
                                "v": 7,
                                "f": "7 servers"
                            },
                            {
                                "v": 4
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "February"
                            },
                            {
                                "v": 13
                            },
                            {
                                "v": 1,
                                "f": "1 unit (Out of stock this month)"
                            },
                            {
                                "v": 12
                            },
                            {
                                "v": 2
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "March"
                            },
                            {
                                "v": 24
                            },
                            {
                                "v": 5
                            },
                            {
                                "v": 11
                            },
                            {
                                "v": 6
                            }
                        ]
                    }
                ]
            },
            "options": {
                "title": "Sales per month",
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Sales unit",
                    "gridlines": {
                        "count": 10
                    }
                },
                "hAxis": {
                    "title": "Date"
                }
            },
            "formatters": {},
            "cssStyle": "width: 600px;height:400px;border: 1px solid red;padding-bottom: 40px;margin:auto"
        }

        $scope.accuracy = {};

        $scope.accuracy.type = "Gauge";

        $scope.accuracy.options = {
            width: 400,
            height: 120,
            redFrom: 0,
            redTo: 40,
            yellowFrom: 40,
            yellowTo: 70,
            minorTicks: 5
        };

        $scope.accuracy.style = "height:200px; width:200px;margin:auto;";

        $scope.accuracy.data = [
            ['Label', 'Value'],
            ['accuracy', 80]
        ];

        $scope.myChartObject = {};

        $scope.myChartObject.type = "Gauge";

        $scope.myChartObject.options = {
            width: 400,
            height: 120,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
            minorTicks: 5
        };

        $scope.myChartObject.style = "height:auto; width:auto;margin:auto;";

        $scope.myChartObject.data = [
            ['Label', 'Value'],
            ['Memory', 80],
            ['CPU', 55],
            ['Network', 68]
        ];

        var chart1 = {};

        chart1.type = "PieChart";

        chart1.cssStyle = "height:400px; width:600px;border: 1px solid red;padding-bottom: 40px;margin:auto";

        chart1.data = {
            "cols": [
                { id: "month", label: "Month", type: "string" },
                { id: "laptop-id", label: "Laptop", type: "number" },
                { id: "desktop-id", label: "Desktop", type: "number" },
                { id: "server-id", label: "Server", type: "number" },
                { id: "cost-id", label: "Shipping", type: "number" }
            ], "rows": [
                {
                    c: [
                        { v: "January" },
                        { v: 19, f: "42 items" },
                        { v: 12, f: "Ony 12 items" },
                        { v: 7, f: "7 servers" },
                        { v: 4 }
                    ]
                },
                {
                    c: [
                        { v: "February" },
                        { v: 13 },
                        { v: 1, f: "1 unit (Out of stock this month)" },
                        { v: 12 },
                        { v: 2 }
                    ]
                },
                {
                    c: [
                        { v: "March" },
                        { v: 24 },
                        { v: 0 },
                        { v: 11 },
                        { v: 6 }

                    ]
                }
            ]
        };

        chart1.options = {
            "title": "Sales per month",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "Sales unit", "gridlines": { "count": 6 }
            },
            "hAxis": {
                "title": "Date"
            }
        };

        chart1.formatters = {};

        $scope.chart = chart1;

        $scope.Barchart = {
            "type": "BarChart",
            "displayed": false,
            "data": {
                "cols": [
                    {
                        "id": "month",
                        "label": "Month",
                        "type": "string",
                        "p": {}
                    },
                    {
                        "id": "laptop-id",
                        "label": "Laptop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "desktop-id",
                        "label": "Desktop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "server-id",
                        "label": "Server",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "cost-id",
                        "label": "Shipping",
                        "type": "number"
                    },
                    {
                        "id": "",
                        "role": "tooltip",
                        "type": "string",
                        "p": {
                            "role": "tooltip",
                            "html": true
                        }
                    }
                ],
                "rows": [
                    {
                        "c": [
                            {
                                "v": "January"
                            },
                            {
                                "v": 19,
                                "f": "42 items"
                            },
                            {
                                "v": 12,
                                "f": "Ony 12 items"
                            },
                            {
                                "v": 7,
                                "f": "7 servers"
                            },
                            {
                                "v": 4
                            },
                            {
                                "v": " <b>Shipping 4</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />"
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "February"
                            },
                            {
                                "v": 13
                            },
                            {
                                "v": 1,
                                "f": "1 unit (Out of stock this month)"
                            },
                            {
                                "v": 12
                            },
                            {
                                "v": 2
                            },
                            {
                                "v": " <b>Shipping 2</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />"
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "March"
                            },
                            {
                                "v": 24
                            },
                            {
                                "v": 5
                            },
                            {
                                "v": 11
                            },
                            {
                                "v": 6
                            },
                            {
                                "v": " <b>Shipping 6</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />"
                            }
                        ]
                    }
                ]
            },
            "options": {
                "title": "Sales per month",
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Sales unit",
                    "gridlines": {
                        "count": 10
                    }
                },
                "hAxis": {
                    "title": "Date"
                },
                "tooltip": {
                    "isHtml": true
                }
            },
            "formatters": {},
            "view": {
                "columns": [
                    0,
                    1,
                    2,
                    4
                ]
            },
            "style": "height:400px; width:600px;border: 1px solid red;padding-bottom: 40px;margin:auto"
        }

        $scope.lineChart = {
            "type": "LineChart",
            "displayed": false,
            "data": {
                "cols": [
                    {
                        "id": "month",
                        "label": "Month",
                        "type": "string",
                        "p": {}
                    },
                    {
                        "id": "laptop-id",
                        "label": "Laptop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "desktop-id",
                        "label": "Desktop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "server-id",
                        "label": "Server",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "cost-id",
                        "label": "Shipping",
                        "type": "number"
                    },
                    {
                        "id": "",
                        "role": "tooltip",
                        "type": "string",
                        "p": {
                            "role": "tooltip",
                            "html": true
                        }
                    }
                ],
                "rows": [
                    {
                        "c": [
                            {
                                "v": "January"
                            },
                            {
                                "v": 19,
                                "f": "42 items"
                            },
                            {
                                "v": 12,
                                "f": "Ony 12 items"
                            },
                            {
                                "v": 7,
                                "f": "7 servers"
                            },
                            {
                                "v": 4
                            },
                            {
                                "v": " <b>Shipping 4</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />",
                                "p": {}
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "February"
                            },
                            {
                                "v": 13
                            },
                            {
                                "v": 1,
                                "f": "1 unit (Out of stock this month)"
                            },
                            {
                                "v": 12
                            },
                            {
                                "v": 2
                            },
                            {
                                "v": " <b>Shipping 2</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />",
                                "p": {}
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "March"
                            },
                            {
                                "v": 24
                            },
                            {
                                "v": 5
                            },
                            {
                                "v": 11
                            },
                            {
                                "v": 6
                            },
                            {
                                "v": " <b>Shipping 6</b><br /><img src=\"http://icons.iconarchive.com/icons/antrepo/container-4-cargo-vans/512/Google-Shipping-Box-icon.png\" style=\"height:85px\" />",
                                "p": {}
                            }
                        ]
                    }
                ]
            },
            "options": {
                "title": "Sales per month",
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Sales unit",
                    "gridlines": {
                        "count": 10
                    }
                },
                "hAxis": {
                    "title": "Date"
                },
                "tooltip": {
                    "isHtml": true
                }
            },
            "formatters": {},
            "view": {},
            "style": "height:400px; width:600px;border: 1px solid red;padding-bottom: 40px;margin:auto"
        }

        $scope.chartObject = {
            "type": "Table",
            "displayed": false,
            "data": {
                "cols": [
                    {
                        "id": "month",
                        "label": "Month",
                        "type": "string",
                        "p": {}
                    },
                    {
                        "id": "laptop-id",
                        "label": "Laptop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "desktop-id",
                        "label": "Desktop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "server-id",
                        "label": "Server",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "cost-id",
                        "label": "Shipping",
                        "type": "number"
                    },
                    {
                        "id": "data-id",
                        "label": "Date",
                        "type": "date"
                    }
                ],
                "rows": [
                    {
                        "c": [
                            {
                                "v": "January",
                                "p": {}
                            },
                            {
                                "v": 19,
                                "f": "<span style=\"padding: 0; float: left; white-space: nowrap;\"><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_s.png\" height=\"12\" width=\"1\" /><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_b.png\" height=\"12\" width=\"80\" /><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_w.png\" height=\"12\" width=\"20\" /><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_s.png\" height=\"12\" width=\"1\" /> 42 items</span> ",
                                "p": {
                                    "className": "google-visualization-formatters-arrow-empty",
                                    "_bar_format_old_value": "42 items"
                                }
                            },
                            {
                                "v": 12,
                                "f": "Ony 12 items",
                                "p": {}
                            },
                            {
                                "v": 7,
                                "f": "7 servers",
                                "p": {}
                            },
                            {
                                "v": 4,
                                "p": {
                                    "style": "color:white;background-color:#800080;"
                                },
                                "f": "$4,00"
                            },
                            {
                                "v": "2013-02-04T22:00:00.000Z",
                                "p": {},
                                "f": "5 février 2013"
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "February",
                                "p": {}
                            },
                            {
                                "v": 13,
                                "p": {
                                    "className": "google-visualization-formatters-arrow-dr",
                                    "_bar_format_old_value": "13"
                                },
                                "f": "<span style=\"padding: 0; float: left; white-space: nowrap;\"><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_s.png\" height=\"12\" width=\"1\" /><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_b.png\" height=\"12\" width=\"55\" /><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_w.png\" height=\"12\" width=\"45\" /><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_s.png\" height=\"12\" width=\"1\" /> 13</span> "
                            },
                            {
                                "v": 1,
                                "f": "1 unit (Out of stock this month)",
                                "p": {}
                            },
                            {
                                "v": 12,
                                "p": {}
                            },
                            {
                                "v": 2,
                                "p": {
                                    "style": "color:white;background-color:red;"
                                },
                                "f": "$2,00"
                            },
                            {
                                "v": "2013-03-04T22:00:00.000Z",
                                "p": {},
                                "f": "5 mars 2013"
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "March",
                                "p": {}
                            },
                            {
                                "v": 24,
                                "p": {
                                    "className": "google-visualization-formatters-arrow-ug",
                                    "_bar_format_old_value": "24"
                                },
                                "f": "<span style=\"padding: 0; float: left; white-space: nowrap;\"><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_s.png\" height=\"12\" width=\"1\" /><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_b.png\" height=\"12\" width=\"100\" /><img style=\"padding: 0\" src=\"https://ajax.googleapis.com/ajax/static/modules/gviz/1.0/util/bar_s.png\" height=\"12\" width=\"1\" /> 24</span> "
                            },
                            {
                                "v": 5,
                                "p": {}
                            },
                            {
                                "v": 11,
                                "p": {}
                            },
                            {
                                "v": 6,
                                "p": {
                                    "style": "color:black;background-color:#33ff33;"
                                },
                                "f": "$6,00"
                            },
                            {
                                "v": "2013-04-04T21:00:00.000Z",
                                "p": {},
                                "f": "5 avril 2013"
                            }
                        ]
                    }
                ]
            },
            "options": {
                "title": "Sales per month",
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Sales unit",
                    "gridlines": {
                        "count": 10
                    }
                },
                "hAxis": {
                    "title": "Date"
                },
                "tooltip": {
                    "isHtml": false
                },
                "allowHtml": true
            },
            "formatters": {
                "number": [
                    {
                        "columnNum": 4,
                        "prefix": "$"
                    }
                ],
                "date": [
                    {
                        "columnNum": 5,
                        "formatType": "long"
                    }
                ],
                "arrow": [
                    {
                        "columnNum": 1,
                        "base": 19
                    }
                ],
                "color": [
                    {
                        "columnNum": 4,
                        "formats": [
                            {
                                "from": 0,
                                "to": 3,
                                "color": "white",
                                "bgcolor": "red"
                            },
                            {
                                "from": 3,
                                "to": 5,
                                "color": "white",
                                "fromBgColor": "red",
                                "toBgColor": "blue"
                            },
                            {
                                "from": 6,
                                "to": null,
                                "color": "black",
                                "bgcolor": "#33ff33"
                            }
                        ]
                    }
                ],
                "bar": [
                    {
                        "columnNum": 1,
                        "width": 100
                    }
                ]
            },
            "view": {}
        }
    })

    .controller('myctrl', function ($scope) {

        $scope.addPoints = function () {
            var seriesArray = $scope.highchartsNG.series
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
        };

        $scope.addSeries = function () {
            var rnd = []
            for (var i = 0; i < 10; i++) {
                rnd.push(Math.floor(Math.random() * 20) + 1)
            }
            $scope.highchartsNG.series.push({
                data: rnd
            })
        }

        $scope.removeRandomSeries = function () {
            var seriesArray = $scope.highchartsNG.series
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray.splice(rndIdx, 1)
        }

        $scope.options = {
            type: 'line'
        }

        $scope.swapChartType = function () {
            if (this.highchartsNG.options.chart.type === 'line') {
                this.highchartsNG.options.chart.type = 'bar'
            } else {
                this.highchartsNG.options.chart.type = 'line'
            }
        }

        $scope.highchartsNG = {
            options: {
                chart: {
                    type: 'bar'
                }
            },
            series: [{
                data: [10, 15, 12, 8, 7]
            }],
            title: {
                text: 'Hello'
            },
            loading: false
        }

    })

    .controller('SplitpaneCtrl', function ($rootScope, $state, $scope, $ionicTabsDelegate, $ionicPlatform, mmMessagesContactTabConst, $ionicScrollDelegate) {

        $scope.currentIndex = null;
        $scope.click = false;
        $ionicScrollDelegate.resize();
        $scope.toclick = function () {
            $scope.click = !$scope.click;
        }

        $scope.getURL = function (index) {
            if ($ionicPlatform.isTablet()) {
                return $state.href('site.teachers.contacts-tablet', {
                    index: index
                });
            }
            return $state.href('site.teachers-contact', {
                index: index
            });
        };
    })

    .controller('mmteacherchartsCtrl', function ($rootScope, $state, $scope, mCourses, $ionicScrollDelegate,
        $ionicTabsDelegate, $ionicPlatform, $window, index, ID, contact) {

        $ionicScrollDelegate.resize();

        if ($rootScope.refreshed === false) {
            $window.location.reload(0);
            $rootScope.refreshed = true;
        }

        if ($ionicPlatform.isTablet())
            $scope.isTab = true;
        if (ionic.Platform.isWebView())
            $scope.isWeb = true;

        $scope.ChartsSemester = ["fall 2016", "spring 2016", "fall 2015", "spring 2015", "fall 2014", "spring 2014", "fall 2013", "spring 2013"];

        $scope.data = {};
        $scope.data.index = 1;
        $scope.choice = function () {
            console.log($scope.data.index);
        };

        if (ID !== "0")
            $scope.Course = "Course : " + $rootScope.currentCourse;
        else
            $scope.Course = "General Information";

        $scope.dep = $rootScope.Department;

        $rootScope.teacher = contact.name;

        console.log("mmteacherchartsCtrl" + contact.name);
        console.log("index " + index);
        console.log("ID " + ID);

        /*d3.select(window).on('resize', resize);*/

        /*function resize() {
            // update width
            width = parseInt(d3.select('#chart').style('width'), 10);
            width = width - margin.left - margin.right;
    
            // reset x range
            x.range([0, width]);
    
            // do the actual resize...
        }*/

        $rootScope.$broadcast('mmMessagesContactSelected', index);
    })

    .controller('mmMessagesCtrl', function ($scope, $state, $ionicPlatform, contacts, discussions) {
        var personIndex = null;

        $scope.contacts = contacts;
        $scope.discussions = discussions;

        $scope.showDiscussionLink = false;
        $scope.showInfoLink = false;

        $scope.goDiscussion = function () {
            $scope.showDiscussionLink = false;
            $scope.showInfoLink = true;
            $state.go('site.messages.tablet', {
                index: personIndex
            });
        };
        $scope.goInfo = function () {
            $scope.showDiscussionLink = true;
            $scope.showInfoLink = false;
            $state.go('site.messages.contacts-tablet', {
                index: personIndex
            });
        };

        // Implemented this way for faster DOM update.
        $scope.$watch(function () {
            return $state.is('site.messages.contacts-tablet');
        }, function (newv, oldv, $scope) {
            if (newv) {
                $scope.showDiscussionLink = true;
                $scope.showInfoLink = false;
            }
        });

        $scope.$watch(function () {
            return $state.is('site.messages.tablet');
        }, function (newv, oldv, $scope) {
            if (newv) {
                $scope.showDiscussionLink = false;
                $scope.showInfoLink = true;
            }
        });

        $scope.$on('mmMessagesContactSelected', function (e, index) {
            personIndex = contacts[index].index;
        });
        $scope.$on('mmMessagesDiscussionSelected', function (e, index) {
            personIndex = index;
        });
    })

    .controller('mmMessagesContactsCtrl', function ($rootScope, $state, $scope, $ionicTabsDelegate, $ionicPlatform, $ionicScrollDelegate, mmMessagesContactTabConst) {
        $ionicScrollDelegate.resize();
        $scope.currentIndex = null;
        $scope.$on('mmMessagesContactSelected', function (e, index) {
            $scope.currentIndex = index;
        });
        $scope.$on('mmMessagesDiscussionSelected', function (e, index) {
            if (mmMessagesContactTabConst != $ionicTabsDelegate.$getByHandle('messages-tabs').selectedIndex()) {
                $scope.currentIndex = null;
            }
        });

        $scope.getURL = function (index) {
            if ($ionicPlatform.isTablet()) {
                return $state.href('site.messages.contacts-tablet', {
                    index: index
                });
            }
            return $state.href('site.messages-contact', {
                index: index
            });
        };
    })

    .controller('mmMessagesDiscussionsCtrl', function ($rootScope, $scope, $stateParams, $state, $ionicPlatform, $ionicTabsDelegate, mmMessagesMessageTabConst) {

        // We can create a service for return device information.
        $scope.isTablet = document.body.clientWidth > 600;
        $scope.currentIndex = null;

        $scope.$on('mmMessagesContactSelected', function (e, index) {
            if (mmMessagesMessageTabConst != $ionicTabsDelegate.$getByHandle('messages-tabs').selectedIndex()) {
                $scope.currentIndex = null;
            }
        });
        $scope.$on('mmMessagesDiscussionSelected', function (e, index) {
            $scope.currentIndex = index;
        });

        $scope.getURL = function (index) {
            if ($ionicPlatform.isTablet()) {
                return $state.href('site.messages.tablet', {
                    index: index
                });
            }
            return $state.href('site.messages-discussion', {
                index: index
            });
        };
    })

    .controller('mmteacherEvalCtrl', function ($rootScope, $window, $state, $stateParams, $scope,
        $ionicTabsDelegate, $ionicScrollDelegate, $ionicPlatform, index, contact,
        mCourses, mmMessagesContactTabConst) {

        console.log("mmteacherEvalCtrl");

        if ($ionicPlatform.isTablet())
            $scope.isTab = true;
        else
            $scope.isTab = false;

        $scope.COURSES = mCourses.all(); // the courses array from firebase json format

        $scope.contact = contact;
        $scope.index = index;

        $ionicScrollDelegate.resize();

        $rootScope.currentCourse = null;

        $scope.currentIndex = null;

        $scope.$on('mmMessagesContactSelected', function (e, index) {
            $scope.currentIndex = index;
        });

        $scope.$on('mmMessagesDiscussionSelected', function (e, index) {
            if (mmMessagesContactTabConst != $ionicTabsDelegate.$getByHandle('messages-tabs').selectedIndex()) {
                $scope.currentIndex = null;
            }
        });

        $scope.switchMode = function () {
            $rootScope.TabMode = !$rootScope.TabMode;
            /*$scope.isTab = !$scope.isTab;
            if ($scope.isTab)
                $scope.TabMode = true;
            else
                $scope.TabMode = false;
            return $state.go('site.teachers.contact.course-charts-tablet', {
                index: index
            });*/
        };

        $scope.sendMessage = function () {
            if ($ionicPlatform.isTablet()) {
                $state.go('site.messages.tablet', {
                    index: index
                });
            } else {
                $state.go('site.messages-discussion', {
                    index: index
                });
            }
        };

        if (ionic.Platform.isWebView())
            $scope.isWeb = true;

        $scope.NoCourseSelected = true;
        $scope.CourseSelectedID = null;

        $scope.selection = function () {
            for (var i = 0; i < $scope.COURSES.length; i++) {
                if ($scope.COURSES[i].selected === true) {
                    $scope.NoCourseSelected = false;
                    break;
                }
            }
            console.log("SELECTION");
        };

        $scope.persist = function (ID) {
            for (var i = 0; i < $scope.COURSES.length; i++)
                if ($scope.COURSES[i].id !== ID)
                    $scope.COURSES[i].selected = false;
            $scope.selection();
        };

        $scope.progressPercent = 100;

        $scope.waitload = function () {
            var interval = setInterval(function () {
                $rootScope.refreshed = false;
                $scope.progressPercent++
                if ($scope.progressPercent == 100) {
                    $rootScope.refreshed = true;
                    $scope.progressPercent = 0
                }
                $scope.$apply()
            }, 5);
        };

        $scope.goURL = function (ID) {
            //		
            $scope.progressPercent = 0;
            /* $scope.waitload();*/
            console.log("new click " + ID);
            if (ID === 0) {
                $scope.NoCourseSelected = true;
                $rootScope.CourseSelectedID = 0;
                //display general charts any way...
            } else {
                $scope.NoCourseSelected = false;
                for (var i = 0; i < $scope.COURSES.length; i++) {
                    console.log("COURSES[i]" + i);
                    if ($scope.COURSES[i].id === ID) {
                        $scope.COURSES[i].selected = true;
                        $scope.CourseSelectedID = ID;
                        $rootScope.currentCourse = $scope.COURSES[i].name;
                        console.log("Course Name : " + $rootScope.currentCourse);
                        break;
                    }
                }
            }
            $scope.persist(ID);

            if ($scope.isTab) {

                $state.go('site.teachers.contacts-tablet.charts-tablet', {
                    // $state.go('site.teachers-charts.tablet', {
                    ID: ID, reload: true
                });
            } else {
                $state.go('site.teacher-charts', {
                    ID: ID
                });
            }
        };
        $rootScope.$broadcast('mmMessagesContactSelected', index);
    })

    .controller('GraphCtrl', function ($scope, $ionicScrollDelegate) {
        $ionicScrollDelegate.resize();
        $scope.data = [{
            key: "Creativeness",
            y: 5
        }, {
                key: "Assessment",
                y: 2
            }, {
                key: "Guidance",
                y: 9
            }, {
                key: "Students Relation",
                y: 7
            }, {
                key: "Curriculum",
                y: 4
            }];
        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 450,
                x: function (d) {
                    return d.key;
                },
                y: function (d) {
                    return d.y;
                },
                showLabels: false,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: false,
                legend: {
                    margin: {
                        top: 5,
                        right: 5,
                        bottom: 5,
                        left: 5
                    }
                }
            }
        };
    })

    .controller('Graph1Ctrl', function ($scope, $ionicScrollDelegate) {

        $ionicScrollDelegate.resize();
        $scope.data = [{
            key: "One",
            y: 5
        }, {
                key: "Two",
                y: 2
            }, {
                key: "Three",
                y: 9
            }, {
                key: "Four",
                y: 7
            }, {
                key: "Five",
                y: 4
            }, {
                key: "Six",
                y: 3
            }, {
                key: "Seven",
                y: .5
            }];
        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 400,
                x: function (d) {
                    return d.key;
                },
                y: function (d) {
                    return d.y;
                },
                showLabels: true,
                duration: 300,
                donut: true,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 10
                    }
                }
            }
        };
    })

    .controller('Graph2Ctrl', function ($scope, $ionicScrollDelegate) {
        $ionicScrollDelegate.resize();
        $scope.data = [{
            key: "Cumulative Return",
            values: [{
                "label": "Student Feedbacks",
                "value": -29.765957771107
            }, {
                    "label": "Punctial",
                    "value": 40
                }, {
                    "label": "some index",
                    "value": 32.807804682612
                }, {
                    "label": "other index",
                    "value": 196.45946739256
                }, {
                    "label": "one more index",
                    "value": 0.19434030906893
                }]
        }];
        $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin: {
                    top: 5,
                    right: 5,
                    bottom: 10,
                    left: 10
                },
                x: function (d) {
                    return d.label;
                },
                y: function (d) {
                    return d.value;
                },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };
    })

    .controller('pedeffectivenessCtrl', function ($ionicScrollDelegate, $window, $scope) {

        $scope.data = [{
            label: "",
            value: 83,
            color: "#828",
            suffix: "%"
        }];
        $scope.options = {
            thickness: 10,
            mode: "gauge",
            total: 100
        };
        $scope.name = "Pedagogical Effectivness";

        /*var count = 0;
        if (count === 0) {
            $window.location.reload(true);
            count++;
        }*/

        //    $window.location.reload(false);


    })

    .controller('ClassClimateCtrl', function ($scope, $ionicScrollDelegate) {
        $ionicScrollDelegate.resize();
        $scope.data = [{
            label: "",
            value: 78,
            color: "#df2313",
            suffix: "%"
        }];
        $scope.options = {
            thickness: 10,
            mode: "gauge",
            total: 100
        };
        $scope.name = "Classroom Climate       ";

    })

    .controller('ClassEngagementCtrl', function ($scope, $ionicScrollDelegate) {
        $ionicScrollDelegate.resize();

        $scope.data = [{
            label: "",
            value: 65,
            color: "#d65528",
            suffix: "%"
        }];
        $scope.options = {
            thickness: 10,
            mode: "gauge",
            total: 100
        };
        $scope.name = "Classroom Engagement    ";

    })

    .controller('RigorousExpectationCtrl', function ($timeout, $ionicScrollDelegate, $window, $scope) {
        $ionicScrollDelegate.resize();
        $scope.data = [{
            label: "",
            value: 99,
            color: "#FF69B4",
            suffix: "%"
        }];
        $scope.options = {
            thickness: 10,
            mode: "gauge",
            total: 100
        };
        $scope.name = "Rigorous Expectation";

        var count = 0;
        if (count === 0) {
            //        $window.location.reload(true);
            count++;
        }

        //    $window.location.reload(false);


    })

    .controller('TeacherStudentCtrl', function ($scope, $ionicScrollDelegate) {
        $ionicScrollDelegate.resize();
        $scope.data = [{
            label: "",
            value: 32,
            color: "#313",
            suffix: "%"
        }];
        $scope.options = {
            thickness: 10,
            mode: "gauge",
            total: 100
        };
        $scope.name = "Student-Teacher Relation";

    })

    .controller('SubjuctValuingCtrl', function ($scope, $ionicScrollDelegate) {
        $ionicScrollDelegate.resize();

        $scope.data = [{
            label: "",
            value: 42,
            color: "#00FF00",
            suffix: "%"
        }];
        $scope.options = {
            thickness: 10,
            mode: "gauge",
            total: 100
        };
        $scope.name = "Subject Valuing    ";

    })

    .controller('mmMessagesContactCtrl', function ($rootScope, $scope, $state, $ionicPlatform, index, contact) {
        console.log("mmMessagesContactCtrl");

        $scope.index = index;
        $scope.contact = contact;
        $scope.sendMessage = function () {
            if ($ionicPlatform.isTablet()) {
                $state.go('site.messages.tablet', {
                    index: index
                });
            } else {
                $state.go('site.messages-discussion', {
                    index: index
                });
            }
        };
        $rootScope.$broadcast('mmMessagesContactSelected', index);


    })

    .controller('mmContactsCtrl', function ($rootScope, $scope, $state, $ionicPlatform, index, contact) {
        $scope.contact = contact;
        $scope.index = index;
        $scope.sendMessage = function () {
            if ($ionicPlatform.isTablet()) {
                $state.go('site.messages.tablet', {
                    index: index
                });
            } else {
                $state.go('site.messages-discussion', {
                    index: index
                });
            }
        };
        $rootScope.$broadcast('mmMessagesContactSelected', index);
    })

    .controller('mmChartCtrl', function ($rootScope, mCourses, $window, $state, $scope, $stateParams,
        $ionicScrollDelegate, $ionicPlatform, $timeout, ID) {

        $ionicScrollDelegate.resize();


        $scope.ChartsSemester = ["fall 2016", "spring 2016", "fall 2015", "spring 2015",
            "fall 2014", "spring 2014", "fall 2013", "spring 2013"
        ];

        $scope.data = {};
        $scope.data.index = 1;
        $scope.choice = function () {
            console.log($scope.data.index);
        };

        if ($ionicPlatform.isTablet())
            $scope.isTab = true;
        else
            $scope.isTab = false;

        $scope.teachername = $rootScope.teacher;

        $scope.courseID = ID;
        console.log("ID" + ID)

        if (ID === "0")
            $scope.Course = "General Information";
        else
            $scope.Course = $rootScope.currentCourse;



        // console.log("ID :" + ID);

        // $scope.Course = "General Information";

        // if (ID !== 0) {
        //     $scope.course = mCourses.getCourse(ID);
        //     console.log("Course Object: " + $scope.course);
        //     $scope.Course = $scope.course.name;
        //     /* $scope.Course = $scope.course.name;*/
        // }

        if ($rootScope.refreshed === false) {
            $window.location.reload(0);
            $rootScope.refreshed = true;
        }

    })

    .controller('ctrl', ['$scope', '$interval', function ($scope, $interval) {
        $scope.main = [
            {
                "className": ".pizza",
                "data": [
                    {
                        "x": "Pepperoni",
                        "y": 4
                    },
                    {
                        "x": "Creamy bacon",
                        "y": 3
                    },
                    {
                        "x": "Mixed grill",
                        "y": 3
                    },
                    {
                        "x": "Cheese",
                        "y": 8
                    },
                    {
                        "x": "Supreme",
                        "y": 8
                    }
                ]
            },
            {
                "className": ".anotherPizza",
                "data": [
                    {
                        "x": "Pepperoni",
                        "y": 4
                    },
                    {
                        "x": "Creamy bacon",
                        "y": 3
                    },
                    {
                        "x": "Mixed grill",
                        "y": 3
                    },
                    {
                        "x": "Cheese",
                        "y": 8
                    },
                    {
                        "x": "Supreme",
                        "y": 8
                    }
                ]
            }
        ]

        // change values at interval 2 seconds
        $interval(function () {
            var main = angular.copy($scope.main);
            angular.forEach(main[0].data, function (d) {
                d.y = Math.floor((Math.random() * 100) + 1);
            });
            angular.forEach(main[1].data, function (d) {
                d.y = Math.floor((Math.random() * 100) + 1);
            });
            $scope.main = main;
        }, 2000)


    }])

    .controller('mmMessageDiscussionCtrl', function ($rootScope, $scope, $stateParams,
        $ionicScrollDelegate, $timeout, mmMessages, discussion) {
        var sv,
            lastDate = null;
        $scope.index = $stateParams.index;

        // We can create a service for return device information.
        $scope.isTablet = document.body.clientWidth > 600;

        // Scroll to the botton.
        $timeout(function () {
            sv = $ionicScrollDelegate.$getByHandle('messagesScroll');
            sv.scrollBottom();
        });

        $scope.addMessage = function (message) {
            if (!message) {
                return;
            }
            mmMessages.addMessage($stateParams.index, message);
            sv.scrollBottom();
        };

        $scope.showDate = function (message) {
            var d = new Date(message.time);
            d.setMilliseconds(0);
            d.setSeconds(0);
            d.setMinutes(0);
            d.setHours(1);

            if (!lastDate || d.getTime() != lastDate.getTime()) {
                lastDate = d;
                return true;
            }
        };

        $scope.discussion = discussion;
        $rootScope.$broadcast('mmMessagesDiscussionSelected', $stateParams.index);
    });