'use strict';

/**
 * @ngdoc function
 * @name assignmentApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the assignmentApp
 */
angular.module('assignmentApp')
  .controller('ProfileCtrl', function ($route) {
    this.data = $route.current.locals.loadUser;
  });
