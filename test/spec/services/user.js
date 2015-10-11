'use strict';

describe('Service: User', function () {

  // load the service's module
  beforeEach(module('assignmentApp'));

  // instantiate
  var User, userData, $httpBackend, requestHandler;
  var userID = 1;
  var url = 'https://api.github.com/users/' + userID;

  beforeEach(inject(function ($injector) {
    User = $injector.get('User');
    $httpBackend = $injector.get('$httpBackend');

    requestHandler = $httpBackend
      .when('GET', url)
      .respond(200, {
        'id': 1,
        'avatar_url': 'http://avatar.com',
        'name': 'Saad',
        'email': 'saad@world.com'
      });
  }));

  it('should request a User', function () {
    $httpBackend.expectGET(url);

    User.get()(userID)
      .then(function success(response){
        userData = {
            id: response.data.id,
            avatar: response.data.avatar_url,
            name: response.data.name,
            email: response.data.email
        };
      });

    $httpBackend.flush();

    expect(userData).toBeDefined();
    expect(Object.keys(userData).length).toBe(4);
    expect(userData.id).toBe(1);
    expect(userData.avatar).toBe('http://avatar.com');
    expect(userData.name).toBe('Saad');
    expect(userData.email).toBe('saad@world.com');
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
