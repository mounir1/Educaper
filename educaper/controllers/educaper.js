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
.controller('mmEducaperCtrl', function($scope, $rootScope, $ionicPopup, $mmCourses, $mmUtil, $ionicModal) {
    $scope.isIOS = ionic.Platform.isIOS();
    $scope.Departments = null;
    $scope.endoflessones = 4; //todo courses ID 

    $scope.rate = function(rate) {
        // do something 
        if (rate == 6)
            $scope.showcomment();
        $scope.closerate();
        $scope.endoflessones = $scope.endoflessones - 1;
    }
    $scope.comment = function(text) {
        $scope.closecomment();
    };

    $ionicModal.fromTemplateUrl('core/components/educaper/templates/rate.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(rateModal) {
        $scope.showrate = function() {
            rateModal.show();

        };
        $scope.closerate = function() {
            rateModal.hide();

        };
        $scope.$on('$destroy', function() {
            rateModal.remove();
        });
    });

    $ionicModal.fromTemplateUrl('core/components/educaper/templates/comment.html', {
        scope: $scope,
        animation: 'slide-in-down'
    }).then(function(commentModal) {
        $scope.showcomment = function() {

            commentModal.show();
        };
        $scope.closecomment = function() {
            commentModal.hide();
        };
        $scope.$on('$destroy', function() {
            commentModal.remove();
        });
    });




    $rootScope.done = false;
    $scope.ShowDep = function() {
        $scope.Departments = [{
                name: "Engineering Department",
                id: "E"
            },
            {
                name: "College of Law",
                id: "L"
            },
            {
                name: "School of Tourizm",
                id: "t"
            },
            {
                name: "Business Administration",
                id: ""
            }
        ];
    };
    $scope.hide = function(dep) {
        $scope.Departments = null;
        console.log("you clicked on " + dep.name);
    };
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'TODO',
            template: 'This function is under construction !'
        });
        console.log("showAlert");;
        alertPopup.then(function(res) {

        });
    };

});