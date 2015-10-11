'use strict';

describe('Route: profile', function () {

  // load the module
  beforeEach(module('assignmentApp'));

  // instantiate
  var $rootScope, $route, $location, $httpBackend, requestHandler;
  var userID = 1;
  var url = 'https://api.github.com/users/' + userID;
  var viewUrl = 'views/profile.html';
  var route = '/profile/';

  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $route = $injector.get('$route');
    $location = $injector.get('$location');

    $httpBackend = $injector.get('$httpBackend');

    // view request
    $httpBackend.when('GET', viewUrl).respond(200);

    // User request
    requestHandler = $httpBackend
      .when('GET', url)
      .respond(200, {
        'id': 1,
        'avatar_url': 'http://avatar.com',
        'name': 'Saad',
        'email': 'saad@world.com'
      });

      // expect user request
      $httpBackend.expectGET(url);
  }));

  it('should load User 1', function () {
    $location.path(route + '1');
  });

  it('should redirect to user 1', function () {
    $location.path(route + 'dd');
  });

  afterEach(function(){
    $rootScope.$digest();
    $httpBackend.flush();

    // after request expectaions
    var user = $route.current.locals.loadUser;

    expect(user).toBeDefined();
    expect(Object.keys(user).length).toBe(4);
    expect(user.id).toBe(1);
    expect(user.avatar).toBe('http://avatar.com');
    expect(user.name).toBe('Saad');
    expect(user.email).toBe('saad@world.com');
  });
});
