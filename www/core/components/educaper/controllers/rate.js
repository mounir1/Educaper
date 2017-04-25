angular.module('mm.core.educaper')

.controller('mmEndOfCourseCtrl', function($scope, $rootScope, $ionicModal, $mmSettingsDelegate) {
    $scope.isIOS = ionic.Platform.isIOS();
    $scope.handlers = $mmSettingsDelegate.getHandlers();
    $scope.areHandlersLoaded = $mmSettingsDelegate.areHandlersLoaded;

    $scope.rate = function(rate) {
        // do something 
        if (rate == 6)
            $scope.showcomment();
        rateModal.hide();
        $rootScope.endoflessones = $rootScope.endoflessones - 1;
    }
    $scope.comment = function(text) {
        commentModal.hide();
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
});