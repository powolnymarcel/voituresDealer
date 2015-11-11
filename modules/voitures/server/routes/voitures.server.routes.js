'use strict';

/**
 * Module dependencies.
 */
var voituresPolicy = require('../policies/voitures.server.policy'),
  voitures = require('../controllers/voitures.server.controller');
console.log('*********************ROUTE SERVEUR VOITURES chargées !********************************');

module.exports = function (app) {
  // Voitures collection routes
  app.route('/api/voitures').all(voituresPolicy.isAllowed)
    .get(voitures.list)
    .post(voitures.create);

  app.route('api/recherche').all(voituresPolicy.isAllowed)
    .get(voitures.recherche);

  // Single voiture routes
  app.route('/api/voitures/:voitureId').all(voituresPolicy.isAllowed)
    .get(voitures.read)
    .put(voitures.update)
    .delete(voitures.delete);

  // Finish by binding the voiture middleware
  app.param('voitureId', voitures.voitureByID);
};
