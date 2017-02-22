(function() {

    var config = {
        apiKey: "AIzaSyDcuFwkUWSC24pdNaNzXwpIoLQGTEsDCBs",
        authDomain: "educaper-bf327.firebaseapp.com",
        databaseURL: "https://educaper-bf327.firebaseio.com",
        storageBucket: "educaper-bf327.appspot.com",
        messagingSenderId: "428302109054"
    };
    firebase.initializeApp(config);

    angular.module('app', ['ionic', 'services', 'AuthCtrl', 'homeCtrl', 'firebase', 'slideCtrl'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {

                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('welcome', {
            url: '/welcome',
            templateUrl: 'welcome/intro.html',
            controller: 'WelcomeCtrl'
        })


        .state('slide', {
            url: '/slide',
            templateUrl: 'slide/slide.html',
            controller: 'SlideCtrl'
        })

        .state('home', {
            url: '/home',
            controller: 'homeCtrl',
            templateUrl: 'home/home.html'
        })

        $urlRouterProvider.otherwise('/welcome');

    });
}());