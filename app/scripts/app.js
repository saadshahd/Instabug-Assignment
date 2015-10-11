'use strict';

/**
 * @ngdoc overview
 * @name assignmentApp
 * @description
 * # assignmentApp
 *
 * Main module of the application.
 */
angular
  .module('assignmentApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
      })
      .when('/profile/:id', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile',
        resolve: {
          loadUser: function($q, $route, User){
            var defer = $q.defer();
            var id = $route.current.params.id;
            var getUser = User.get();

            function reject(){
              defer.reject();
              $route.updateParams({id: 1});
            }

            if(isNaN(Number(id))){
              reject();
            } else {
              getUser(id).then(function success(response){
                defer.resolve({
                  id:     response.data.id,
                  avatar: response.data.avatar_url,
                  name:   response.data.name,
                  email:  response.data.email,
                });
              }, function error(response){
                console.log(response);
                reject();
              });
            }

            return defer.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
