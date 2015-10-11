'use strict';

/**
 * @ngdoc service
 * @name assignmentApp.User
 * @description
 * # User
 * Factory in the assignmentApp.
 */
angular.module('assignmentApp')
  .factory('User', function ($http) {
    // Get User Method
    // return a promise
    function getUser(id){
      return $http({
        url: 'https://api.github.com/users/' + id,
        method: 'GET'
      });
    }

    // Public API here
    return {
      get: function() {
        return getUser;
      }
    };
  });
