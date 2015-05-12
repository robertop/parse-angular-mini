/**
 * Created by roberto on 5/12/15.
 */

angular.module('parseAngular')
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'login/login.html'
    });
}])
.controller('LoginController', ['$scope', '$state', function($scope, $state) {
    $scope.email = '';
    $scope.password = '';
    $scope.onSubmit = function() {
        Parse.User.logIn($scope.email, $scope.password)
            .then(function() {
                $state.go('signed-in');
            }, function(e) {
                alert('error logging in:' + e.message);
            });
    };
}]);