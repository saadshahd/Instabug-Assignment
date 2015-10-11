"use strict";angular.module("assignmentApp",["ngResource","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html"}).when("/profile/:id",{templateUrl:"views/profile.html",controller:"ProfileCtrl",controllerAs:"profile",resolve:{loadUser:["$q","$route","User",function(a,b,c){function d(){e.reject(),b.updateParams({id:1})}var e=a.defer(),f=b.current.params.id,g=c.get();return isNaN(Number(f))?d():g(f).then(function(a){e.resolve({id:a.data.id,avatar:a.data.avatar_url,name:a.data.name,email:a.data.email})},function(a){console.log(a),d()}),e.promise}]}}).otherwise({redirectTo:"/"})}]),angular.module("assignmentApp").controller("UserCtrl",["$location",function(a){this.goToProfile=function(b){a.path("/profile/"+b)}}]),angular.module("assignmentApp").factory("User",["$http",function(a){function b(b){return a({url:"https://api.github.com/users/"+b,method:"GET"})}return{get:function(){return b}}}]),angular.module("assignmentApp").controller("ProfileCtrl",["$route",function(a){this.data=a.current.locals.loadUser}]),angular.module("assignmentApp").run(["$templateCache",function(a){a.put("views/main.html","<h2>Welcome Guset</h2> <p>Insert an ID to show the full data of user</p> <ng-include src=\"'getUser.html'\"></ng-include>"),a.put("views/profile.html",'<div class="row"> <div class="col-sm-12"> <ng-include src="\'getUser.html\'"></ng-include> </div> </div> <div class="row user-row"> <div class="col-sm-12"> <div class="thumbnail"> <img ng-src="{{profile.data.avatar}}" alt="Avatar\'s {{profile.data.name}}"> <div class="caption"> <h3 ng-if="profile.data.name">{{profile.data.name}}</h3> <p ng-if="profile.data.id"><strong>ID:</strong>{{profile.data.id}}</p> <p ng-if="profile.data.email"><strong>Email:</strong>{{profile.data.email}}</p> </div> </div> </div> </div>')}]);