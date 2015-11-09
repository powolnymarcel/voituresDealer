'use strict';

(function () {
  // Voitures Controller Spec
  describe('Voitures Controller Tests', function () {
    // Initialize global variables
    var VoituresController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Voitures,
      mockVoiture;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Voitures_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Voitures = _Voitures_;

      // create mock voiture
      mockVoiture = new Voitures({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Voiture about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Voitures controller.
      VoituresController = $controller('VoituresController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one voiture object fetched from XHR', inject(function (Voitures) {
      // Create a sample voitures array that includes the new voiture
      var sampleVoitures = [mockVoiture];

      // Set GET response
      $httpBackend.expectGET('api/voitures').respond(sampleVoitures);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.voitures).toEqualData(sampleVoitures);
    }));

    it('$scope.findOne() should create an array with one voiture object fetched from XHR using a voitureId URL parameter', inject(function (Voitures) {
      // Set the URL parameter
      $stateParams.voitureId = mockVoiture._id;

      // Set GET response
      $httpBackend.expectGET(/api\/voitures\/([0-9a-fA-F]{24})$/).respond(mockVoiture);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.voiture).toEqualData(mockVoiture);
    }));

    describe('$scope.create()', function () {
      var sampleVoiturePostData;

      beforeEach(function () {
        // Create a sample voiture object
        sampleVoiturePostData = new Voitures({
          title: 'An Voiture about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Voiture about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Voitures) {
        // Set POST response
        $httpBackend.expectPOST('api/voitures', sampleVoiturePostData).respond(mockVoiture);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the voiture was created
        expect($location.path.calls.mostRecent().args[0]).toBe('voitures/' + mockVoiture._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/voitures', sampleVoiturePostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock voiture in scope
        scope.voiture = mockVoiture;
      });

      it('should update a valid voiture', inject(function (Voitures) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/voitures\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/voitures/' + mockVoiture._id);
      }));

      it('should set scope.error to error response message', inject(function (Voitures) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/voitures\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(voiture)', function () {
      beforeEach(function () {
        // Create new voitures array and include the voiture
        scope.voitures = [mockVoiture, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/voitures\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockVoiture);
      });

      it('should send a DELETE request with a valid voitureId and remove the voiture from the scope', inject(function (Voitures) {
        expect(scope.voitures.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.voiture = mockVoiture;

        $httpBackend.expectDELETE(/api\/voitures\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to voitures', function () {
        expect($location.path).toHaveBeenCalledWith('voitures');
      });
    });
  });
}());
