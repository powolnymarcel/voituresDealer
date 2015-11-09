'use strict';

// Setting up route
angular.module('voitures').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('voitures', {
        abstract: true,
        url: '/voitures',
        template: '<ui-view/>'
      })
      .state('voitures.liste', {
        url: '',
        templateUrl: 'modules/voitures/client/views/liste-voitures.client.view.html'
      })
      .state('voitures.ajouter', {
        url: '/ajouter',
        templateUrl: 'modules/voitures/client/views/ajouter-voiture.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('voitures.vue', {
        url: '/:voitureId',
        templateUrl: 'modules/voitures/client/views/vue-voiture.client.view.html'
      })
      .state('voitures.editer', {
        url: '/:voitureId/editer',
        templateUrl: 'modules/voitures/client/views/editer-voiture.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
