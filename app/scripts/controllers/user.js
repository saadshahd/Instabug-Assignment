'use strict';

/**
 * @ngdoc function
 * @name assignmentApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the assignmentApp
 */
angular.module('assignmentApp')
  .controller('UserCtrl', function ($location) {
    this.goToProfile = function(userID){
      $location.path('/profile/' + userID);
    };
  });
