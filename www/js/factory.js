angular.module('services', [])

.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }
])

.factory('$localstorage', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}])

.factory("DB", ["$firebaseArray", function($firebaseArray) {
    var root = firebase.database().ref();
    var UsersRef = root.child("Users");
    References = {
        UsersRef: root.child("Users"),
        PushesRef: root.child("Pushes"),
        ClassesRef: root.child("Classes"),
        IsRegistered: function(u) {
            UsersRef.child(u).once('value', function(snapshot) {
                if (snapshot.exists()) {
                    return true;
                } else
                    return false;
            });
        }
    }
    return References;
}])