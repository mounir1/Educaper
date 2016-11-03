angular.module('mm.auth', [])

	.factory('mmAuth', function () {

		var store = window.sessionStorage;
		var CurrentUser = window.sessionStorage;

		// $http.get('educaper-team.json').success(function(data) {
		// 	store.identities = data;
		// });

		function isLoggedIn() {
			return store.isLoggedIn && parseInt(store.isLoggedIn, 10) === 1;
		}

		function login() {
			store.isLoggedIn = '1';
		}

		function logout() {
			store.isLoggedIn = '0';
		}

		function addIdentity(data) {
			var identities = getIdentities();
			identities.push(data);
			setCurrentUser(data);
			store.identities = JSON.stringify(identities);
		}

		function deleteIdentity(index) {
			var identities = getIdentities();
			identities.splice(index, 1);
			store.identities = JSON.stringify(identities);
		}

		function setCurrentUser(user) {
			CurrentUser = user;
			console.log("CurrentUser  " + CurrentUser.name + "user " + user.name);
		}
		function getCurrentUser() {
			return CurrentUser;
		}
		function hasIdentities() {
			var identities = getIdentities();
			return identities.length > 0;
		}

		function getIdentities() {
			var identities = store.identities;
			if (!identities) {
				return [];
			}
			return JSON.parse(identities);
		}

		return {
			addIdentity: addIdentity,
			deleteIdentity: deleteIdentity,
			hasIdentities: hasIdentities,
			isLoggedIn: isLoggedIn,
			login: login,
			logout: logout,
			getIdentities: getIdentities,
			setCurrentUser: setCurrentUser,
			getCurrentUser: getCurrentUser
		}

	})

	.controller('mmAuthLoginCtrl', function ($scope, $state, $timeout, mmAuth) {

		$scope.identities = mmAuth.getIdentities();
		$scope.data = {
			hasIdentities: mmAuth.hasIdentities(),
			showDetele: false
		}

		$scope.toggleDelete = function () {
			$scope.data.showDelete = !$scope.data.showDelete;
		};


		$scope.onItemDelete = function (e, index) {
			mmAuth.deleteIdentity(index);
			$scope.identities.splice(index, 1);
			console.log($scope.identities);

			$scope.data.hasIdentities = mmAuth.hasIdentities();
			if (!$scope.data.hasIdentities) {
				$scope.data.showDelete = false;
			}

			// Prevent login() from being triggered. No idea why I cannot replicate this
			// problem on http://codepen.io/ionic/pen/JsHjf.
			e.stopPropagation();
		}

		$scope.login = function () {
			mmAuth.login();
			$state.go('site.index');
		}

		$scope.add = function () {
			$state.go('login.site');
		}

	})

	.controller('mmAuthSiteCtrl', function ($scope, $ionicLoading, $state, $timeout, mmAuth) {
		$scope.skipthis = function () {

			$ionicLoading.show({
				template: '<img class="icon" src="img/icon.ico">  Loading...'
			});
			$timeout(function () {
				$ionicLoading.hide();
				$state.go('login.credentials', {
					url: "educaper.com/LMS"
				});
			}, 1000);
		}
		$scope.connect = function (url) {
			if (!url) {
				return;
			}

			$ionicLoading.show({
				template: '<img class="icon" src="img/icon.ico">  <i class="icon ion-load-c"> Loading...'
			});
			$timeout(function () {
				$ionicLoading.hide();
				$state.go('login.credentials', {
					url: url
				});
			}, 1000);
		}
	})

	.controller('mmAuthCredCtrl', function ($rootScope, $scope, $state, $ionicLoading,
		$stateParams, $timeout, mmAuth, mUsers) {

		$scope.url = $stateParams.url;
		$scope.credentials = {};

		$scope.roles = ["Education Expert", "Department Deen", "Instructor", "Student"];
		$scope.data = {};
		$scope.data.index = 3;
		$scope.choice = function () {
			console.log($scope.data.index);
			console.log($scope.roles[$scope.data.index]);
			$rootScope.EducaperRole = $scope.roles[$scope.data.index];
		};

		$scope.login = function () {
			$ionicLoading.show({

				template: '<img src="img/icon.ico " style="width:34px;height:34px "  > LMS ---->>> Loading...'

			});
			$timeout(function () {
				$ionicLoading.hide();
				if (!$scope.credentials.username || !$scope.credentials.password) {
					return;
				}

				// if (!mUsers.inUsers($scope.credentials.username)) {
				// 	$scope.User.name = $scope.credentials.username;
				// 	$scope.User.thumb = 'http://api.randomuser.me/portraits/thumb/men/' + Math.round((Math.random() * 99) + 1) + '.jpg',
				// 		$scope.User.role = "student";
				// 	$scope.User.id = Math.round((Math.random() * 99) + 1);
				// 	$scope.User.LastLogin = new Date().getTime();
				// 	mUsers.addUser($scope.User);
				// 	mUsers.setUser($scope.User);
				// }

				$scope.role = $rootScope.EducaperRole;
				// switch ($scope.credentials.username) {
				// 	case "Imad": {
				// 		$scope.role = "Instructor";
				// 		break;
				// 	}
				// 	case "Abdullah": {
				// 		$scope.role = "Department Deen";
				// 		break;
				// 	}
				// 	case "Mounir": {
				// 		$scope.role = "Education Expert";
				// 		break;
				// 	}
				// }


				mmAuth.addIdentity({
					thumb: 'http://api.randomuser.me/portraits/thumb/men/' + Math.round((Math.random() * 99) + 1) + '.jpg',
					name: $scope.credentials.username,
					role: $scope.role,
					id: new Date().getTime(),
					desc: $scope.url
				});
				mmAuth.login();
				$state.go('site.index');
			}, 1000);
		}
	});
