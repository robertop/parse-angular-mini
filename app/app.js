/**
 * Created by roberto on 5/12/15.
 */
angular.module('parseAngular', [
    'ui.router',
    'parse-angular'
]).config(['$urlRouterProvider', function($urlRouterProvider) {

    $urlRouterProvider.otherwise('login');

}]).run(['$rootScope', '$state', function($rootScope, $state) {

    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error) {
            $state.go('login');
        }
    );
}]);