'use strict';

/**
 * @ngdoc function
 * @name nightlynachosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nightlynachosApp
 */

angular.module('nightlynachosApp')
  .controller('MainCtrl', ['$scope', 'fbutil', '$timeout',
   function($scope, fbutil, $timeout) {

    console.log(fbutil);

    self = this;
    self.nachos = fbutil.syncArray('nachos', {limitToLast: 500});

    self.nachos.$loaded().catch(alert);

    self.addNacho = function(newNacho) {
      if( newNacho.title && newNacho.description && newNacho.photos ) {
        self.nachos.$add({
          title: newNacho.title
        , description: newNacho.description
        , photos: newNacho.photos
        , tags: newNacho.tags
        })
          .catch(alert);
      }
    }

    $scope.editNacho = function (nacho) {
      self.editedNacho = nacho;
      self.originalNacho = angular.extend({}, self.editedNacho);
    };

    $scope.doneEditing = function (nacho) {
      self.editedNacho = null;
      var title = nacho.title.trim();
      var description = nacho.description.trim();
      var photos = nacho.photos;
      var tags = nacho.tags;
      if (title && description && photos) {
        self.nachos.$save(nacho);
      } else {
        self.removeNacho(nacho);
      }
    };

    $scope.revertEditing = function (nacho) {
      nacho.title = self.originalNacho.title;
      nacho.description = self.originalNacho.description;
      nacho.photos = self.originalNacho.photos;
      nacho.tags = self.originalNacho
      self.doneEditing(nacho);
    };

    function alert(msg) {
      $scope.err = msg
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

    function validateTitle(title) {
      if (typeof title === 'string'
        && title.length >= 5
        && title.length <= 50
        ){
        return true;
      }
      return false;
    }



    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
