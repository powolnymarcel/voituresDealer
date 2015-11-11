'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication','Voitures',
  function ($scope, Authentication,Voitures) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    // Find a list of Voitures
    $scope.trouver = function () {
      $scope.voitures = Voitures.query();
    };


  }
]);
