angular.module('mm.core.educaper')

/**
 * Controller to handle course participants.
 *
 * @module mm.addons.participants
 * @ngdoc controller
 * @name mmaParticipantsListCtrl
 */
.controller('mmEParticipantsListCtrl', function($scope, $state, $stateParams, $mmUtil, $mmaParticipants, $ionicPlatform, $mmSite,
    mmUserProfileState) {
    var course = $stateParams.course,
        courseid = course.id;

    $scope.participants = [];
    $scope.courseid = courseid;
    $scope.userStateName = mmUserProfileState;

    function fetchParticipants(refresh) {
        var firstToGet = refresh ? 0 : $scope.participants.length;
        return $mmaParticipants.getParticipants(courseid, firstToGet).then(function(data) {
            if (refresh) {
                $scope.participants = data.participants;
            } else {
                $scope.participants = $scope.participants.concat(data.participants);
            }
            $scope.canLoadMore = data.canLoadMore;
        }, function(message) {
            $mmUtil.showErrorModal(message);
            $scope.canLoadMore = false; // Set to false to prevent infinite calls with infinite-loading.
        });
    }

    // Get first participants.
    fetchParticipants(true).then(function() {
        // Add log in Moodle.
        $mmSite.write('core_user_view_user_list', {
            courseid: courseid
        });
    }).finally(function() {
        $scope.participantsLoaded = true;
    });

    // Load more participants.
    $scope.loadMoreParticipants = function() {
        fetchParticipants().finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.refreshParticipants = function() {
        $mmaParticipants.invalidateParticipantsList(courseid).finally(function() {
            fetchParticipants(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
});