angular.module('mm.try', ['nvd3'])

.controller('TeacherEval', function ($scope) {



  //
  //$scope.data = [{label: "", value: 93, color: "#728", suffix: "%"}];
  //$scope.options = {thickness: 10, mode: "gauge", total: 100};
  //
  //$scope.data1 = [{label: "", value: 78, color: "#df28", suffix: "%"}];
  //$scope.options1 = {thickness: 10, mode: "gauge", total: 100};
  //
  //$scope.data2 = [{label: "", value: 34, color: "#d628", suffix: "%"}];
  //$scope.options2 = {thickness: 10, mode: "gauge", total: 100};

})
.controller('pm',function($scope){
  $scope.data = [
    {
      key: "One",
      y: 5
    },
    {
      key: "Two",
      y: 2
    }
    ,
    {
      key: "Three",
      y: 9
    }
    ,
    {
      key: "Four",
      y: 7
    }
    ,
    {
      key: "Five",
      y: 4
    }
    ,
    {
      key: "Six",
      y: 3
    }
    ,
    {
      key: "Seven",
      y: .5
    }
  ];
  $scope.options = {
    chart: {
      type: 'pieChart',
      height: 500,
      x: function (d) {
        return d.key;
      },
      y: function (d) {
        return d.y;
      },
      showLabels: true,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    }
  };
  $scope.data = [
    {
      key: "Angular",
      y: 18567
    },
    {
      key: "Backbone",
      y: 16651
    },
    {
      key: "Ember",
      y: 9023
    },
    {
      key: "Flight",
      y: 4655
    }
    ,
    {
      key: "Knockout",
      y: 4487
    }
    ,
    {
      key: "Marionette"
      ,
      y: 4261
    }
    ,
    {
      key: "React",
      y: 3691
    }
  ];
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
      showLabels: false,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      width: 420,
      title: "Sweet!",
      donut: true,
      tooltips: false,
      legend: {
        margin: {
          top: 5,
          right: 0,
          bottom: 5,
          left: 0
        }
      }
    }
  };

})
.controller('vm',function($scope){
  $scope.data = [
    {
      key: "One",
      y: 5
    },
    {
      key: "Two",
      y: 2
    }
    ,
    {
      key: "Three",
      y: 9
    }
    ,
    {
      key: "Four",
      y: 7
    }
    ,
    {
      key: "Five",
      y: 4
    }
    ,
    {
      key: "Six",
      y: 3
    }
    ,
    {
      key: "Seven",
      y: .5
    }
  ];
  $scope.options = {
    chart: {
      type: 'pieChart',
      height: 500,
      x: function (d) {
        return d.key;
      },
      y: function (d) {
        return d.y;
      },
      showLabels: true,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: false,
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    }
  };

})
.controller('bm',function($scope){
  $scope.data = [{
    key: "Cumulative Return",
    values: [
      {"label": "compatbility", "value": -29.765957771107},
      {"label": "Engagement", "value": 0},
      {"label": "C", "value": 32.807804682612},
      {"label": "D", "value": 196.45946739256},
      {"label": "E", "value": 0.19434030906893},
      {"label": "F", "value": -98.079782601442},
      {"label": "G", "value": -13.925743130903},
      {"label": "H", "value": -5.1387322875705}
    ]
  }];
  $scope.options = {
    chart: {
      type: 'discreteBarChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 60,
        left: 55
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

});
