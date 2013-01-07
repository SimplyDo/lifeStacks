'use strict';


// Declare app level module which depends on filters, and services
angular.module('lifeStacks', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/stack/:stack', {templateUrl: 'partials/stack.html', controller: 'stacksController'});
    $routeProvider.when('/editStack/:stack', {templateUrl: 'partials/editStack.html', controller: 'stacksController'});
    $routeProvider.otherwise({redirectTo:'/stack/'});
  }]);