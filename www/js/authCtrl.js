angular.module('AuthCtrl', [])

.controller('WelcomeCtrl', function($rootScope, $filter, $localstorage, $firebaseArray, Auth, DB, $scope, $stateParams, $ionicModal, $location) {

    $scope.usersRef = DB.UsersRef;
    $scope.error = null;
    $scope.register = false;
    $scope.Users = $firebaseArray($scope.usersRef);
    console.log(JSON.stringify($scope.Users));


    $scope.isIncorrectValue = function(val) {
        return angular.isUndefined(val) || val === null || val == "";
    }

    $scope.cleanVariables = function() {
        $scope.error = null;
    }

    Auth.$onAuthStateChanged(function(authData) {

        if ($scope.loggedInUser) {

            // if ($scope.register) {
            //     $location.path('/slide');
            // } else {

            //     $scope.register = false;
            // }
            $location.path('/home');
        } else {
            console.log("Signed out");
            $scope.loggedInUser = null;
            $location.path('/welcome');
        }

    });
    $scope.forgot = function(mail) {
        if (mail)
            Auth.$sendPasswordResetEmail(mail).then(function() {
                console.log("email reset sent!");
            }, function(error) {

                $scope.error = "" + error;
            });
        else
            $scope.error = " you didn't provide an email !";


        $scope.closeForget();
    }

    $scope.createUser = function(form) {
        if ($scope.isIncorrectValue(form.email) || $scope.isIncorrectValue(form.password)) {
            $scope.error = "Incorrect credentails !... ...";
        } else {
            Auth.$createUserWithEmailAndPassword(form.email, form.password)
                .then(function(user) {
                    $scope.loggedInUser = user;
                    $scope.register = true;
                    console.log(user);
                    $rootScope.uid = user.uid;
                    $localstorage.set('uid', user.uid);
                    $scope.usersRef.child(user.uid).set({
                        name: form.name,
                        email: user.email,
                        provider: "Email",
                        registredOn: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z')
                    });


                    return Auth.$signInWithEmailAndPassword(form.email, form.password)
                }).catch(function(error) {
                    $scope.error = "" + error;
                });
        }
        $scope.closeRegister();
    };

    // $scope.SignWithFacebook = function() {

    //     Auth.$signInWithPopup("facebook").then(function(result) {
    //         //TODO if newely registred !
    //         console.log(result);
    //         $rootScope.uid = result.user.uid;
    //         if (DB.IsRegistered(result.user.uid)) {
    //             $scope.register = true;

    //             $scope.usersRef.child(result.user.uid).set({

    //                 email: result.user.email,
    //                 provider: "Facebook",
    //                 name: result.user.displayName,
    //                 photo: result.user.photoURL,
    //                 registredOn: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z')
    //             });
    //         }

    //         // $scope.User.lastLogin = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');
    //         $scope.loggedInUser = result.user;
    //     }).catch(function(error) {
    //         $scope.error = "" + error;
    //     });
    // }

    // $scope.SignWithTwitter = function() {
    //     Auth.$signInWithPopup("twitter").then(function(result) {
    //         console.log(result);
    //         $rootScope.uid = result.user.uid;
    //         if (DB.IsRegistered(result.user.uid)) {
    //             $scope.register = true;
    //             $scope.usersRef.child(result.user.uid).set({
    //                 email: result.user.email,
    //                 provider: "Twitter",
    //                 name: result.user.displayName,
    //                 photo: result.user.photoURL,
    //                 lastLogin: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z')
    //             });
    //         }


    //         $scope.loggedInUser = result.user;
    //     }).catch(function(error) {
    //         $scope.error = "" + error;
    //     });
    // }

    // $scope.SignWithGoogle = function() {

    //     Auth.$signInWithPopup("google").then(function(result) {
    //         console.log(result);
    //         $rootScope.uid = result.user.uid;
    //         if (!DB.IsRegistered(result.user.uid)) {
    //             $scope.register = true;
    //             $scope.usersRef.child(result.user.uid).set({
    //                 email: result.user.email,
    //                 provider: "Google",
    //                 name: result.user.displayName,
    //                 photo: result.user.photoURL,
    //                 registredOn: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z'),
    //                 lastLogin: ""
    //             });
    //         }

    //         $scope.loggedInUser = result.user;
    //     }).catch(function(error) {
    //         $scope.error = "" + error;
    //     });
    // }

    $scope.loginUser = function(user) {
        if ($scope.isIncorrectValue(user.email) || $scope.isIncorrectValue(user.password)) {
            $scope.error = "Incorrect credentails !... ...";
        } else {
            Auth.$signInWithEmailAndPassword(user.email, user.password)
                .then(function(authData) {

                    $scope.loggedInUser = authData;
                    $localstorage.set('uid', authData.uid);
                }).catch(function(error) {
                    $scope.error = "" + error;
                });
        }
    }

    $ionicModal.fromTemplateUrl('welcome/forget.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalForget = modal;
    });

    // Open the modal
    $scope.openForget = function() {
        $scope.cleanVariables();
        $scope.modalForget.show();
    };

    // Close the modal
    $scope.closeForget = function() {
        $scope.cleanVariables();
        $scope.modalForget.hide();
    };


    $ionicModal.fromTemplateUrl('welcome/register.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalRegister = modal;
    });

    // Open the modal
    $scope.openRegister = function() {
        $scope.cleanVariables();
        $scope.modalRegister.show();
    };

    // Close the modal
    $scope.closeRegister = function() {
        $scope.cleanVariables();
        $scope.modalRegister.hide();
    };
});