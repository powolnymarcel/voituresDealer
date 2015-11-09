'use strict';

//Voitures service used for communicating with the voitures REST endpoints
angular.module('voitures').factory('Voitures', ['$resource',
  function ($resource) {
    return $resource('api/voitures/:voitureId', {
      voitureId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
