angular.module('homeCtrl', [])

.controller('homeCtrl', function($rootScope, DB, $localstorage, $scope, $firebaseObject, Auth, $filter, $firebaseArray, $interval, $ionicPopup, $stateParams, $ionicModal, $location) {

    if (!$rootScope.uid)
        $rootScope.uid = $localstorage.get('uid')

    var usersref = DB.UsersRef;
    var pushesref = DB.PushesRef;
    var classesref = DB.ClassesRef;
    var userref = usersref.child($rootScope.uid);
    var userdeviceref = userref.child('device');
    var userCommentsref = userref.child('Comments');
    var userfeedssref = userref.child('Feedbacks');

    $scope.default = "forgot the default text to appear here !"
    $scope.User = $firebaseArray(userref);
    $scope.UserDevice = $firebaseArray(userdeviceref);
    $scope.Comments = $firebaseArray(userCommentsref);
    $scope.Feeds = $firebaseArray(userfeedssref);
    $scope.Pushes = $firebaseArray(pushesref);



    $scope.numberOfNotifications = 0;

    document.addEventListener("deviceready", onDeviceReady, false);


    function onDeviceReady() {
        var notificationOpenedCallback = function(jsonData) {
            $scope.text = jsonData.notification.payload.body;
            $scope.numberOfNotifications = $scope.numberOfNotifications + 1;
            $scope.openNotification();
            $scope.Pushes.$add(jsonData);

        };

        window.plugins.OneSignal
            .startInit("254346df-6c03-4aec-8c41-61f0c9eff825")
            .handleNotificationOpened(notificationOpenedCallback)
            .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
            .endInit();

        window.plugins.OneSignal.setLogLevel({ logLevel: 0, visualLevel: 0 });

        window.plugins.OneSignal.setSubscription(true);

        window.plugins.OneSignal.enableNotificationsWhenActive(true);
        if (device) {
            $scope.myDevice = {
                cordova: device.cordova || null,
                model: device.model || null,
                platform: device.platform || null,
                deviceID: device.uuid || null,
                version: device.version || null,
                manufacture: device.manufacturer || null,
                isVirtual: device.isVirtual || null,
                serialNumber: device.serial || null
            }
            $scope.UserDevice.$add({ deviceinfo: $scope.myDevice });
        }
    }

    $ionicModal.fromTemplateUrl('home/comment.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalComment = modal;
    });
    // Open the modal
    $scope.openComment = function() {
        $scope.modalComment.show();
    };
    // Close the modal
    $scope.closeComment = function() {
        $scope.modalComment.hide();
    };
    // //notification
    $ionicModal.fromTemplateUrl('home/feedback.html', {
        scope: $scope,
        animation: 'slide-in-down'
    }).then(function(modal) {
        $scope.modalNotification = modal;
    });
    // Open the modal
    $scope.openNotification = function() {

        if ($scope.numberOfNotifications > 0) {
            $scope.numberOfNotifications = $scope.numberOfNotifications - 1;
            $scope.modalNotification.show();
        } else
            $scope.showAlert();
    };
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: " ops !",
            template: "this will be available when you receive a notification "
        });
    };

    // Close the modal
    $scope.closeNotification = function() {
        $scope.modalNotification.hide();
    };

    $scope.sendComment = function(comment) {
        $scope.time = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
        $scope.Comments.$add({ class: "", comment: comment, time: $scope.time });
        $scope.comment = null;
        $scope.modalComment.hide();
    }

    $scope.feed = function(feed) {
            $scope.modalNotification.hide();
            $scope.modalComment.show();
            $scope.time = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
            $scope.Feeds.$add({ class: "", feedicon: feed, time: $scope.time });

        }
        //     Auth.$onAuthStateChanged(function(authData) {
        //         if (!authData) {
        //             console.log(authData + "Signed out");
        //             $scope.loggedInUser = null;
        //             $location.path('/welcome');
        //         }

    // });

    // $scope.logout = function() {
    //     alert("login out");
    //     Auth.$signOut();
    //     $scope.loggedInUser = null;
    //     $location.path('/welcome');
    // };
})