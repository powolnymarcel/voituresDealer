'use strict';

// Voitures controller
angular.module('voitures').controller('VoituresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Voitures',
  function ($scope, $stateParams, $location, Authentication, Voitures) {
    $scope.authentication = Authentication;

    // Create new Voiture
    $scope.creer = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'voitureForm');

        return false;
      }

      // Create new Voiture object
      var voiture = new Voitures({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      voiture.$save(function (response) {
        $location.path('voitures/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Voiture
    $scope.supprimer = function (voiture) {
      if (voiture) {
        voiture.$remove();

        for (var i in $scope.voitures) {
          if ($scope.voitures[i] === voiture) {
            $scope.voitures.splice(i, 1);
          }
        }
      } else {
        $scope.voiture.$remove(function () {
          $location.path('voitures');
        });
      }
    };

    // Update existing Voiture
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'voitureForm');

        return false;
      }

      var voiture = $scope.voiture;

      voiture.$update(function () {
        $location.path('voitures/' + voiture._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Voitures
    $scope.trouver = function () {
      $scope.voitures = Voitures.query();
    };

    // Find existing Voiture
    $scope.trouverUnique = function () {
      $scope.voiture = Voitures.get({
        voitureId: $stateParams.voitureId
      });
    };
  }
]);
