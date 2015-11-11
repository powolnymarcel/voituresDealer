'use strict';

// Voitures controller
angular.module('voitures').controller('VoituresController', ['$scope', '$stateParams', '$location','UrlService', 'Authentication', 'Voitures',
  function ($scope, $stateParams, $location,UrlService, Authentication, Voitures) {
    $scope.authentication = Authentication;

    // Create new Voiture
    $scope.creer = function (isValid) {
      $scope.error = null;

     //if (!isValid) {
     //  $scope.$broadcast('show-errors-check-validity', 'voitureForm');

     //  return false;
     //}

      // Create new Voiture object
      var voiture = new Voitures({
        titre         : this.titre,
        description   : this.description,
        constructeur  : this.constructeur,
        modele        : this.modele,
        type          : this.type,
        imageurl      : this.imageurl,
        contact_email : this.contact_email,
        province      : this.province,
        carburant     : this.carburant,
        annee         : this.annee,
        prix          : this.prix,
        transmission  : this.transmission,
        couleur       : this.couleur
      });

      // Redirect after save
      voiture.$save(function (response) {
        $location.path('voitures/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
        $scope.titre= '';
        $scope.descritpion= '';
        $scope.constructeur= '';
        $scope.modele= '';
        $scope.type= '';
        $scope.imageurl= '';
        $scope.contact_email= '';
        $scope.province= '';
        $scope.carburant= '';
        $scope.annee= '';
        $scope.prix= '';
        $scope.transmission= '';
        $scope.couleur= '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Voiture
    $scope.supprimer = function (voiture) {

      if(confirm('Etes-vous sur?')){
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
      }
    };

    // Update existing Voiture
    $scope.update = function (isValid) {
      $scope.error = null;

      //if (!isValid) {
      //  $scope.$broadcast('show-errors-check-validity', 'voitureForm');
      //  return false;
      //}

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
      console.log('******************VOITURES**************');
      console.log($scope.voitures);
    };

    //Pour la recherche on utilise le service UrlService qui se charde de décomposer l'url
    $scope.recherche = function () {
      console.log('******************recherche**************');
      console.log(UrlService.getQueryStringVar('constructeur'))
      var constructeur =UrlService.getQueryStringVar('constructeur');
      var modele =UrlService.getQueryStringVar('modele');
      var province =UrlService.getQueryStringVar('province');
      var type =UrlService.getQueryStringVar('type');
      var requete={};

      if(constructeur !=0){
        requete.constructeur=constructeur;
      }
      if(modele !=0){
        requete.modele=modele;
      }
      if(province !=0){
        requete.province=province;
      }

      requete.type = type;


      $scope.voitures = Voitures.query(requete);
console.log($scope.voitures);
    };
    // Find existing Voiture
    $scope.trouverUnique = function () {
      $scope.voiture = Voitures.get({
        voitureId: $stateParams.voitureId
      });
      console.log($scope.voiture);
    };
  }
]);
