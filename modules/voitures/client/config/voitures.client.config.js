'use strict';

// Configuring the Articles module
angular.module('voitures').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Voitures',
      state: 'voitures',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'voitures', {
      title: 'Liste Voitures',
      state: 'voitures.liste'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'voitures', {
      title: 'Ajouter Voitures',
      state: 'voitures.ajouter',
      roles: ['user']
    });
  }
]);
