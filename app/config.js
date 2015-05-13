/**
 * Created by roberto on 5/12/15.
 */
angular.module('parseAngular')
.config([function() {
    Parse.initialize(
        // Application ID goes here
        'YOUR-PARSE-APP-ID-HERE',

        // Javascript Key goes here
        'YOUR-PARSE-APP-JAVASCRIPT-KEY-HERE'
    );
}]);