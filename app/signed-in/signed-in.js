/**
 * Created by roberto on 5/12/15.
 */

angular.module('parseAngular')
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('signed-in', {
            url: '/signed-in',
            controller: 'SignedInController',
            templateUrl: 'signed-in/signed-in.html',
            resolve: {
                currentUser: ['$q', function($q) {
                  return $q(function(resolve, reject) {
                      var user = Parse.User.current();
                      if (user) {
                          resolve(user);
                      }
                      else {
                          reject('User is not logged in');
                      }
                  });
                }]
            }
        });
}])
.controller('SignedInController', ['$state', '$scope', 'currentUser', function($state, $scope, currentUser) {
    $scope.currentUser = currentUser;
    $scope.onLogOut = function() {
        Parse.User.logOut();
        $state.go('login');
    };
}]);
