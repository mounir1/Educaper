angular.module('app', ['ionic', 'app.uirouts', 'ui.router',
	'mm.auth', 'mm.site', 'mm.files', 'app.derectives',
	'mm.appsettings', 'app.services', 'mm.sections', 'xcharts',
	'mm.forums', 'mm.events', 'app.controllers'])



	.config(function ($ionicConfigProvider) {

		// Enable native scrolls for Android platform only,
		// as you see, we're disabling jsScrolling to achieve this.
		if (ionic.Platform.isAndroid()) {
			$ionicConfigProvider.scrolling.jsScrolling(false);
		}
	})

	.run(function ($ionicPlatform, $rootScope, $state, mmAuth, $ionicBody, $window) {

		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			var deviceInformation = ionic.Platform.device();

			var isWebView = ionic.Platform.isWebView();
			var isIPad = ionic.Platform.isIPad();
			var isIOS = ionic.Platform.isIOS();
			var isAndroid = ionic.Platform.isAndroid();
			var isWindowsPhone = ionic.Platform.isWindowsPhone();

			var currentPlatform = ionic.Platform.platform();
			var currentPlatformVersion = ionic.Platform.version();

			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}

			var checkTablet = function () {
				$ionicBody.enableClass($ionicPlatform.isTablet(), 'tablet');
			};
			ionic.on('resize', checkTablet, $window);
			checkTablet();
		});

		$rootScope.stateIsLoading = false;
		$rootScope.$on('$stateChangeStart', function () {
			$rootScope.stateIsLoading = true;
		});
		$rootScope.$on('$stateChangeSuccess', function () {
			$rootScope.stateIsLoading = false;
		});
		$rootScope.$on('$stateChangeError', function () {
			//catch error
		});

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

			if (toState.name.substr(0, 5) !== 'login' && !mmAuth.isLoggedIn()) {
				// We are not logged in.
				event.preventDefault();
				console.log('Redirect to login page, request was: ' + toState.name);
				$state.transitionTo('login.index');
			} else if (toState.name.substr(0, 5) === 'login' && mmAuth.isLoggedIn()) {
				// We are logged in and requested the login page.
				event.preventDefault();
				console.log('Redirect to course page, request was: ' + toState.name);
				$state.transitionTo('site.index');
			}

		});


	})


	//	.directive('uiSrefIf', function ($compile) {
	//		return {
	//			scope: {
	//				val: '@uiSrefVal',
	//				if: '=uiSrefIf'
	//			},
	//			link: function ($scope, $element, $attrs) {
	//				$element.removeAttr('ui-sref-if');
	//				$compile($element)($scope);
	//
	//				$scope.$watch('if', function (bool) {
	//					if (bool) {
	//						$element.attr('ui-sref', $scope.val);
	//					} else {
	//						$element.removeAttr('ui-sref');
	//						$element.removeAttr('href');
	//					}
	//					$compile($element)($scope);
	//				});
	//			}
	//		};
	//	})

	.filter('dateDayAndTime', function ($filter) {
		return function (d) {
			// TODO optmise this, we can surely cache most of this.
			var todayStarts = new Date();
			var todayEnds = new Date();
			var sixDayStarts = new Date();
			var yearStarts = new Date();
			var yearEnds = new Date();
			var monthStarts = new Date();
			var monthEnds = new Date();
			var dateStarts = new Date(d);
			var dateEnds = new Date(d);

			todayStarts.setHours(0, 0, 0, 0);
			todayEnds.setHours(23, 59, 59, 999);
			dateStarts.setHours(0, 0, 0, 0);
			dateEnds.setHours(23, 59, 59, 999);
			sixDayStarts.setHours(0, 0, 0, 0);
			sixDayStarts = new Date(sixDayStarts.getTime() - (3600 * 24 * 6 * 1000));
			monthStarts.setHours(0, 0, 0, 0);
			monthStarts.setDate(1);
			monthEnds = new Date(monthEnds.getFullYear(), monthEnds.getMonth() + 1, 0);
			monthEnds.setHours(23, 59, 59, 999);
			yearStarts = new Date(yearStarts.getFullYear() - 1, 12, 1);
			yearStarts.setHours(0, 0, 0, 0);
			yearEnds = new Date(yearEnds.getFullYear(), 12, 0);
			yearEnds.setHours(23, 59, 59, 999);

			// TODO use proper localised filter.
			// TODO add more rules
			// TODO allow customisation of the date format through the filter
			//      (i.e. 'short' vs 'long', as in month displayed as Month or as Number)
			if (d >= todayStarts && d <= todayEnds) {
				// Today.
				return $filter('date')(d, 'h:mm a');
			} else if (d >= sixDayStarts && d < todayStarts) {
				// In the last 6 days.
				return $filter('date')(d, 'EEE, h:mm a');
			} else if (d >= monthStarts && d <= monthEnds) {
				// In the same month.
				return $filter('date')(d, 'EEE d, h:mm a');
			} else if (d >= yearStarts && d <= yearEnds) {
				// In the same year.
				return $filter('date')(d, 'MMM d, h:mm a');
			} else {
				return $filter('date')(d, 'd/MM/yy h:mm a');
			}
		};
	})

	.filter('dateDayOrTime', function ($filter) {
		return function (d) {
			// TODO optmise this, we can surely cache most of this.
			var todayStarts = new Date();
			var todayEnds = new Date();
			var sixDayStarts = new Date();
			var yearStarts = new Date();
			var yearEnds = new Date();
			var monthStarts = new Date();
			var monthEnds = new Date();
			var dateStarts = new Date(d);
			var dateEnds = new Date(d);

			todayStarts.setHours(0, 0, 0, 0);
			todayEnds.setHours(23, 59, 59, 999);
			dateStarts.setHours(0, 0, 0, 0);
			dateEnds.setHours(23, 59, 59, 999);
			sixDayStarts.setHours(0, 0, 0, 0);
			sixDayStarts = new Date(sixDayStarts.getTime() - (3600 * 24 * 6 * 1000));
			monthStarts.setHours(0, 0, 0, 0);
			monthStarts.setDate(1);
			monthEnds = new Date(monthEnds.getFullYear(), monthEnds.getMonth() + 1, 0);
			monthEnds.setHours(23, 59, 59, 999);
			yearStarts = new Date(yearStarts.getFullYear() - 1, 12, 1);
			yearStarts.setHours(0, 0, 0, 0);
			yearEnds = new Date(yearEnds.getFullYear(), 12, 0);
			yearEnds.setHours(23, 59, 59, 999);

			// TODO use proper localised filter.
			// TODO add more rules
			// TODO allow customisation of the date format through the filter
			//      (i.e. 'short' vs 'long', as in month displayed as Month or as Number)
			if (d >= todayStarts && d <= todayEnds) {
				// Today.
				return $filter('date')(d, 'h:mm a');
			} else if (d >= sixDayStarts && d < todayStarts) {
				// In the last 6 days.
				return $filter('date')(d, 'EEE');
			} else if (d >= monthStarts && d <= monthEnds) {
				// In the same month.
				return $filter('date')(d, 'EEE, d');
			} else if (d >= yearStarts && d <= yearEnds) {
				// In the same year.
				return $filter('date')(d, 'MMM d');
			} else {
				return $filter('date')(d, 'd/MM/yy');
			}
		}
	});
