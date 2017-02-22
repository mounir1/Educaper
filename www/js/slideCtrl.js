angular.module('slideCtrl', [])


.filter('plainText', function() {
    return function(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
})


.controller('PhotoCtrl', function($scope) {


})


.controller('SearchCtrl', function($scope) {
    /*  
      $scope.bieres = [];

      $scope.$watch('query', function() {
        if($scope.query.length > 1) {
          $scope.getBiere();
        } else {
          $scope.details = [];
        }
      });

      $scope.getBiere = function() {
        searchSrv.getBiere().then(
          function(bieres) {
            applyRemoteData(bieres);
          }
        );
      };

      function applyRemoteData(newBieres) {
        $scope.bieres = newBieres;
        alert($scope.bieres);
      }
    */
})


/**********************************
 * [CONTROLLER] ACCOUNT
 *********************************/
.controller('AccountCtrl', function(Firebase, Auth, $scope, $location) {

    /**********************************
     * [FIREBASE]
     *********************************/

    Auth.$onAuthStateChanged(function(authData) {
        if (!authData) {
            console.log("Signed out");
            $scope.loggedInUser = null;
            $location.path('/welcome');
        }
    });

    $scope.logout = function() {
        Auth.$signOut();
    }
})

/**********************************
 * [CONTROLLER] SLIDE
 *********************************/
.controller('SlideCtrl', function($scope) {
    console.log('slide mow idiot !');
});


// app.controller('ctrl', function($scope, $ionicPush) {
//     $scope.message = "token";
//     $ionicPush.register().then(function(t) {
//         return $ionicPush.saveToken(t);
//     }).then(function(t) {

//         console.log('Token saved:', t.token);
//         $scope.message = t.token;
//     });
//     $scope.$on('cloud:push:notification', function(event, data) {
//         var msg = data.message;
//         alert(msg.title + '' + msg.txt);
//     });
// });